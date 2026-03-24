"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  const preloadedImagesRef = useRef<HTMLImageElement[]>([]);
  const [displayChapter, setDisplayChapter] = useState<typeof CHAPTERS[number] | null>(null);

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

  function startSeek(target: number) {
    setPlaying(false);
    setActiveLinkIndex(target);
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
    if (!ready || !playing) return;

    const baseInterval = 1000 / FPS;
    const hold = holdsMs[index] ?? 0;
    const interval = baseInterval + hold;

    timerRef.current = setTimeout(() => {
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
  }, [ready, index, playing, frames.length, holdsMs]);

  useEffect(() => {
    return () => {
      stopSeek();
      if (displayChapterTimerRef.current) clearTimeout(displayChapterTimerRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function handleUserSetFrame(newIndex: number) {
    stopSeek();
    setActiveLinkIndex(null);
    if (PAUSE_ON_USER) setPlaying(false);
    setIndex(newIndex);
  }

  return (
    <div className={styles.scrubber}>
      <div className={`${styles.contentBlock} ${styles.contentBlockBrand}`}>
        <div className={styles.viewportContainer}>
          <div className={styles.contentCombo}>
            <p className={`${styles.brand} u-type-small`}>Tentdrager.be</p>
          </div>
        </div>
      </div>

      <div className={`${styles.contentBlock} ${styles.contentBlockTitle}`}>
        <div className={`${styles.viewportContainer} ${styles.viewportContainerTitle}`}>
          <div className={styles.contentCombo}>
            <div className={styles.headingWrap}>
              {!displayChapter ? (
                <h1 className={`${styles.introTitle} u-type-huge`}>
                  <span>Hanteer je daktent</span>
                  <span>met gemak</span>
                </h1>
              ) : (
                <p
                  key={`${displayChapter.id}-${displayChapter.title}`}
                  className={styles.pauseCopy}
                >
                  <strong>{displayChapter.title}.</strong> {displayChapter.body}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.contentBlock} ${styles.contentBlockVisual}`}>
        <div className={`${styles.viewportContainer} ${styles.viewportContainerVisual}`}>
          <div className={styles.contentCombo}>
            <div className={styles.frameWrap}>
              <img src={frames[index]} alt="" className={styles.frame} />
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.contentBlock} ${styles.contentBlockSlider}`}>
        <div className={styles.viewportContainer}>
          <div className={styles.contentCombo}>
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
          </div>
        </div>
      </div>

      <div className={`${styles.contentBlock} ${styles.contentBlockButtons}`}>
        <div className={styles.viewportContainer}>
          <div className={styles.contentCombo}>
            <nav className={styles.labels}>
              {CHAPTERS.map((c) => (
                <a
                  key={c.id}
                  href="#"
                  data-active={
                    activeLinkIndex === c.index ||
                    (playing &&
                      activeLinkIndex === null &&
                      (holdsMs[index] ?? 0) > 0 &&
                      c.index === index)
                  }
                  onClick={(e) => {
                    e.preventDefault();

                    if (activeLinkIndex === c.index) {
                      stopSeek();
                      setActiveLinkIndex(null);
                      setPlaying(true);
                      return;
                    }

                    startSeek(c.index);
                  }}
                >
                  {c.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
