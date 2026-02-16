"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./StopMotionScrubber.module.css";
import { CHAPTERS } from "@/lib/scrubberchapters";

const FPS = 8;
const SEEK_FPS = 25;
const AUTOPLAY = true;
const LOOP = true; // ping-pong keeps going
const PAUSE_ON_USER = true;
const TOTAL_FRAMES = 88;

// Delay before showing the pause card (prevents flashes)
const CARD_SHOW_DELAY_MS = 200;

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

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(AUTOPLAY);
  const [activeLinkIndex, setActiveLinkIndex] = useState<number | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const dirRef = useRef<1 | -1>(1);

  const seekTimerRef = useRef<NodeJS.Timeout | null>(null);
  const seekTargetRef = useRef<number | null>(null);

  // ✅ Pause-card visibility state (delayed)
  const [cardVisible, setCardVisible] = useState(false);
  const cardDelayRef = useRef<NodeJS.Timeout | null>(null);

  // Preload frames once
  useEffect(() => {
    let cancelled = false;

    (async () => {
      await Promise.all(
        frames.map(async (src) => {
          const img = new Image();
          img.src = src;
          try {
            // @ts-ignore
            if (img.decode) await img.decode();
          } catch {}
          if (cancelled) return;
        })
      );
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

        const dir = prev < t ? 1 : -1;
        return prev + dir;
      });

      if (seekTargetRef.current !== null) {
        seekTimerRef.current = setTimeout(step, stepMs);
      }
    };

    step();
  }

  // Which chapter card to show:
  const cardChapter = useMemo(() => {
    if (activeLinkIndex !== null) {
      return CHAPTERS.find((c) => c.index === activeLinkIndex) ?? null;
    }
    const hold = holdsMs[index] ?? 0;
    if (hold > 0) return CHAPTERS.find((c) => c.index === index) ?? null;
    return null;
  }, [activeLinkIndex, holdsMs, index]);

  // ✅ Delay show/hide to prevent flashes
  useEffect(() => {
    // clear any pending timer
    if (cardDelayRef.current) clearTimeout(cardDelayRef.current);

    if (!cardChapter) {
      // hide immediately when there is no chapter
      setCardVisible(false);
      return;
    }

    // show after a short delay (prevents brief flashes)
    setCardVisible(false);
    cardDelayRef.current = setTimeout(() => {
      setCardVisible(true);
    }, CARD_SHOW_DELAY_MS);

    return () => {
      if (cardDelayRef.current) clearTimeout(cardDelayRef.current);
    };
  }, [cardChapter]);

  // Autoplay logic: ping-pong (left↔right), includes holds
  useEffect(() => {
    if (!playing) return;

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
  }, [index, playing, frames.length, holdsMs]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSeek();
      if (cardDelayRef.current) clearTimeout(cardDelayRef.current);
    };
  }, []);

  function handleUserSetFrame(newIndex: number) {
    stopSeek();
    setActiveLinkIndex(null);
    if (PAUSE_ON_USER) setPlaying(false);
    setIndex(newIndex);
  }

  function togglePlayPause() {
    stopSeek();
    setActiveLinkIndex(null);
    setPlaying((p) => !p);
  }

  return (
    <div className={styles.scrubber}>
      <div className={styles.frameWrap}>
        <img src={frames[index]} alt="" className={styles.frame} />
      </div>

      {cardChapter && (
        <div className={styles.pauseCardWrapper}>
          <div
            className={`${styles.pauseCard} ${
              cardVisible ? styles.pauseCardVisible : styles.pauseCardHidden
            }`}
          >
            <div className={styles.pauseText}>
              <div className={styles.pauseBody}>{cardChapter.body}</div>
            </div>

            <button type="button" className={styles.pauseCta} aria-label="Meer info">
              +
            </button>
          </div>
        </div>
      )}

      <nav className={styles.labels}>
        {CHAPTERS.map((c) => (
          <a
            key={c.id}
            href="#"
            data-active={
                activeLinkIndex === c.index ||
                (playing && activeLinkIndex === null && (holdsMs[index] ?? 0) > 0 && c.index === index)
            }
            onClick={(e) => {
              e.preventDefault();

              // second click on active link = deselect + resume autoplay
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


        <div className={styles.rangeWrap}>
        <input
            type="range"
            min={0}
            max={frames.length - 1}
            step={1}
            value={index}
            onChange={(e) => handleUserSetFrame(Number(e.target.value))}
            className={styles.range}
        />
        <div className={styles.rangeLine} aria-hidden="true" />
        </div>
    </div>
  );
}
