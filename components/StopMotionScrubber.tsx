"use client";

import { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import ContentBlock from "./ContentBlock";
import styles from "./StopMotionScrubber.module.css";
import { CHAPTERS } from "@/lib/scrubberchapters";

const FPS = 6;
const SEEK_FPS = 18;
const AUTOPLAY = true;
const LOOP = true;
const PAUSE_ON_USER = true;
const TOTAL_FRAMES = 88;
const START_FRAME = 24;
const PAUSE_TEXT_DELAY_MS = 200;
const PLAY_RING_RADIUS = 14.5;
const PLAY_RING_CENTER = 18;
const PLAY_RING_MIN_PROGRESS = 0.02;
const PLAY_RING_MAX_PROGRESS = 0.999;

function polarToCartesian(cx: number, cy: number, radius: number, angleDeg: number) {
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy + radius * Math.sin(angleRad),
  };
}

function buildClockwiseArc(progress: number) {
  const clamped = Math.min(Math.max(progress, PLAY_RING_MIN_PROGRESS), PLAY_RING_MAX_PROGRESS);
  const startAngle = -90;
  const sweepAngle = 360 * clamped;
  const endAngle = startAngle + sweepAngle;
  const start = polarToCartesian(PLAY_RING_CENTER, PLAY_RING_CENTER, PLAY_RING_RADIUS, startAngle);
  const end = polarToCartesian(PLAY_RING_CENTER, PLAY_RING_CENTER, PLAY_RING_RADIUS, endAngle);
  const largeArcFlag = sweepAngle > 180 ? 1 : 0;

  return `M ${start.x} ${start.y} A ${PLAY_RING_RADIUS} ${PLAY_RING_RADIUS} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
}

export default function StopMotionScrubber() {
  const frames = useMemo(
    () =>
      Array.from({ length: TOTAL_FRAMES }, (_, i) =>
        `/svg/${String(i + 1).padStart(2, "0")}.svg`
      ),
    []
  );

  const holdsMs = useMemo(() => {
    const map: Record<number, number> = {};
    for (const c of CHAPTERS) {
      if (typeof c.holdMs === "number" && c.holdMs > 0) map[c.index] = c.holdMs;
    }
    return map;
  }, []);

  const [index, setIndex] = useState(START_FRAME);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [activeLinkIndex, setActiveLinkIndex] = useState<number | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const dirRef = useRef<1 | -1>(1);
  const seekTimerRef = useRef<NodeJS.Timeout | null>(null);
  const seekTargetRef = useRef<number | null>(null);
  const displayChapterTimerRef = useRef<NodeJS.Timeout | null>(null);
  const playRingTweenRef = useRef<gsap.core.Tween | null>(null);
  const preloadedImagesRef = useRef<HTMLImageElement[]>([]);
  const [displayChapter, setDisplayChapter] = useState<typeof CHAPTERS[number] | null>(null);
  const [skippedHoldIndex, setSkippedHoldIndex] = useState<number | null>(null);
  const [ringProgress, setRingProgress] = useState(PLAY_RING_MAX_PROGRESS);

  useEffect(() => {
    dirRef.current = 1;
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        await Promise.all(
          frames.map(async (src) => {
            try {
              await fetch(src, { cache: "force-cache" });
            } catch {}
          })
        );

        if (cancelled) return;

        const imgs = frames.map((src) => {
          const img = new Image();
          img.src = src;
          img.decoding = "async";
          return img;
        });

        preloadedImagesRef.current = imgs;

        await Promise.all(
          imgs.map(async (img) => {
            try {
              if (img.decode) await img.decode();
            } catch {}
          })
        );

        if (cancelled) return;

        setReady(true);
        if (AUTOPLAY) setPlaying(true);
      } catch {
        if (!cancelled) {
          setReady(true);
          if (AUTOPLAY) setPlaying(true);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [frames]);

  function stopSeek() {
    seekTargetRef.current = null;
    if (seekTimerRef.current) clearTimeout(seekTimerRef.current);
    seekTimerRef.current = null;
  }

  const stopPlayRingTween = useCallback(() => {
    if (playRingTweenRef.current) {
      playRingTweenRef.current.kill();
      playRingTweenRef.current = null;
    }
  }, []);

  function startSeek(target: number) {
    setPlaying(false);
    setActiveLinkIndex(target);
    setSkippedHoldIndex(null);
    stopSeek();

    const clamped = Math.max(0, Math.min(frames.length - 1, target));
    seekTargetRef.current = clamped;

    const stepMs = 1000 / SEEK_FPS;

    const step = () => {
      setIndex((prev) => {
        const t = seekTargetRef.current;
        if (t === null) return prev;
        if (prev === t) {
          stopSeek();
          return prev;
        }
        return prev + (prev < t ? 1 : -1);
      });

      if (seekTargetRef.current !== null) {
        seekTimerRef.current = setTimeout(step, stepMs);
      }
    };

    step();
  }

  const cardChapter = useMemo(() => {
    if (activeLinkIndex !== null) {
      return CHAPTERS.find((c) => c.index === activeLinkIndex) ?? null;
    }
    const hold = holdsMs[index] ?? 0;
    if (hold > 0) return CHAPTERS.find((c) => c.index === index) ?? null;
    return null;
  }, [activeLinkIndex, holdsMs, index]);

  const autoplayHoldMs =
    playing && activeLinkIndex === null && skippedHoldIndex !== index
      ? holdsMs[index] ?? 0
      : 0;

  useEffect(() => {
    if (displayChapterTimerRef.current) clearTimeout(displayChapterTimerRef.current);

    if (!cardChapter) {
      displayChapterTimerRef.current = setTimeout(() => {
        setDisplayChapter(null);
      }, 0);
      return;
    }

    displayChapterTimerRef.current = setTimeout(() => {
      setDisplayChapter(cardChapter);
    }, PAUSE_TEXT_DELAY_MS);

    return () => {
      if (displayChapterTimerRef.current) clearTimeout(displayChapterTimerRef.current);
    };
  }, [cardChapter]);

  useEffect(() => {
    stopPlayRingTween();

    if (!autoplayHoldMs) {
      return;
    }

    const ringState = { progress: PLAY_RING_MAX_PROGRESS };
    playRingTweenRef.current = gsap.to(ringState, {
      duration: autoplayHoldMs / 1000,
      ease: "none",
      progress: PLAY_RING_MIN_PROGRESS,
      onUpdate: () => {
        setRingProgress(ringState.progress);
      },
    });

    return () => {
      if (playRingTweenRef.current) {
        playRingTweenRef.current.kill();
        playRingTweenRef.current = null;
      }
    };
  }, [autoplayHoldMs, index, stopPlayRingTween]);

  useEffect(() => {
    if (!ready || !playing) return;

    const baseInterval = 1000 / FPS;
    const hold = skippedHoldIndex === index ? 0 : holdsMs[index] ?? 0;
    const interval = baseInterval + hold;

    timerRef.current = setTimeout(() => {
      if (skippedHoldIndex === index) {
        setSkippedHoldIndex(null);
      }
      setIndex((prev) => {
        const last = frames.length - 1;
        let next = prev + dirRef.current;

        if (next > last) {
          if (!LOOP) return prev;
          dirRef.current = -1;
          next = prev - 1;
        } else if (next < 0) {
          if (!LOOP) return prev;
          dirRef.current = 1;
          next = prev + 1;
        }

        return next;
      });
    }, interval);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [ready, index, playing, frames.length, holdsMs, skippedHoldIndex]);

  useEffect(() => {
    return () => {
      stopSeek();
      stopPlayRingTween();
      if (displayChapterTimerRef.current) clearTimeout(displayChapterTimerRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [stopPlayRingTween]);

  function handleUserSetFrame(newIndex: number) {
    stopSeek();
    setActiveLinkIndex(null);
    setSkippedHoldIndex(null);
    if (PAUSE_ON_USER) setPlaying(false);
    setIndex(newIndex);
  }

  function handlePlayClick() {
    stopSeek();
    if (holdsMs[index]) {
      setSkippedHoldIndex(index);
    }
    setActiveLinkIndex(null);
    setPlaying(true);
  }

  const playOverlayStyle = {
    "--play-offset-y": `${displayChapter?.playOffsetY ?? 0}px`,
  } as CSSProperties;
  const effectiveRingProgress = autoplayHoldMs ? ringProgress : PLAY_RING_MAX_PROGRESS;
  const playRingPath = buildClockwiseArc(effectiveRingProgress);

  return (
    <div className={styles.scrubber}>
      {!displayChapter ? (
        <ContentBlock
          title="Hanteer je daktent met gemak"
          comboVariant="bigTitle"
          className={`${styles.contentBlock} ${styles.contentBlockTitle}`}
          viewportClassName={styles.viewportContainerTitle}
          titleClassName={styles.introTitle}
        />
      ) : (
        <ContentBlock
          description={
            <>
              <strong>{displayChapter.title}.</strong> {displayChapter.body}
            </>
          }
          className={`${styles.contentBlock} ${styles.contentBlockTitle}`}
          viewportClassName={styles.viewportContainerTitle}
          descriptionClassName={styles.pauseCopy}
        />
      )}

      <ContentBlock viewportClassName={styles.viewportContainerVisual}>
        <div className={styles.frameWrap}>
          <img src={frames[index]} alt="" className={styles.frame} />
          {displayChapter ? (
            <button
              type="button"
              className={styles.playOverlay}
              style={playOverlayStyle}
              onClick={handlePlayClick}
              aria-label="Speel verder"
            >
              <svg
                className={styles.playRing}
                viewBox="0 0 36 36"
                aria-hidden="true"
              >
                <path
                  className={styles.playRingArc}
                  d={playRingPath}
                />
              </svg>
              <span className={styles.playDisc} aria-hidden="true">
                <span className={styles.playIcon} aria-hidden="true" />
              </span>
            </button>
          ) : null}
        </div>
      </ContentBlock>

      <ContentBlock className={styles.contentBlockSlider}>
        <div className={styles.sliderSlot}>
          <div className={styles.rangeWrap}>
            <input
              type="range"
              min={0}
              max={frames.length - 1}
              step={1}
              value={index}
              onChange={(e) => handleUserSetFrame(Number(e.target.value))}
              className={styles.range}
              aria-label="Scrub timeline"
            />
            <div className={styles.rangeLine} aria-hidden="true" />
          </div>
        </div>
      </ContentBlock>

      <ContentBlock
        comboVariant="buttonStack"
        buttons={CHAPTERS.map((c) => ({
          label: c.label,
          href: "#",
          active:
            activeLinkIndex === c.index ||
            (playing &&
              activeLinkIndex === null &&
              (holdsMs[index] ?? 0) > 0 &&
              c.index === index),
          onClick: (e) => {
            e.preventDefault();

            if (activeLinkIndex === c.index) {
              stopSeek();
              setActiveLinkIndex(null);
              setPlaying(true);
              return;
            }

            startSeek(c.index);
          },
        }))}
      />
    </div>
  );
}
