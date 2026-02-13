"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./StopMotionScrubber.module.css";

type JumpPoint = {
  label: string;
  index: number;
};

const FPS = 8;
const SEEK_FPS = 25;
const AUTOPLAY = true;
const LOOP = true;
const PAUSE_ON_USER = true;
const TOTAL_FRAMES = 88;

// Hold durations (ms) for specific frames (typically your link frames)
const HOLDS_MS: Record<number, number> = {
  0: 1200,
  39: 800,
  46: 1500,
  53: 900,
  87: 1800,
};

export default function StopMotionScrubber() {
  // ✅ Make frames stable (not recreated every render)
  const frames = useMemo(
    () =>
      Array.from({ length: TOTAL_FRAMES }, (_, i) =>
        `/svg/${String(i + 1).padStart(2, "0")}.svg`
      ),
    []
  );

  const jumpPoints: JumpPoint[] = [
    { label: "Meenemen", index: 0 },
    { label: "Opbergen", index: 39 },
    { label: "Openen", index: 46 },
    { label: "Ophijsen", index: 53 },
    { label: "Verplaatsen", index: 87 },
  ];

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(AUTOPLAY);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Seeking state
  const seekTimerRef = useRef<NodeJS.Timeout | null>(null);
  const seekTargetRef = useRef<number | null>(null);

  // ✅ Preload frames once (warm cache + reduce first-seek choppiness)
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
          } catch {
            // ignore decode issues (SVG decode can be inconsistent)
          }

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
    // Pause autoplay while seeking (and reflect that in the button)
    setPlaying(false);

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

  // Autoplay logic (includes holds)
  useEffect(() => {
    if (!playing) return;

    const baseInterval = 1000 / FPS;
    const hold = HOLDS_MS[index] ?? 0;
    const interval = baseInterval + hold;

    timerRef.current = setTimeout(() => {
      setIndex((prev) => {
        if (prev >= frames.length - 1) {
          return LOOP ? 0 : prev;
        }
        return prev + 1;
      });
    }, interval);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, playing, frames.length]);

  // Cleanup seek timer on unmount
  useEffect(() => {
    return () => {
      stopSeek();
    };
  }, []);

  function handleUserSetFrame(newIndex: number) {
    stopSeek();
    if (PAUSE_ON_USER) setPlaying(false);
    setIndex(newIndex);
  }

  function togglePlayPause() {
    stopSeek();
    setPlaying((p) => !p);
  }

  return (
    <div className={styles.player}>
      <div className={styles.frameWrap}>
        <img src={frames[index]} alt="" className={styles.frame} />
      </div>

      <nav className={styles.labels}>
        <button
          type="button"
          className={styles.playPause}
          aria-label={playing ? "Pause autoplay" : "Play autoplay"}
          onClick={togglePlayPause}
        >
          {playing ? (
            <span className={styles.pauseIcon} aria-hidden="true" />
          ) : (
            <span className={styles.playIcon} aria-hidden="true" />
          )}
        </button>

        {jumpPoints.map((jp) => (
          <a
            key={jp.index}
            href="#"
            data-active={index === jp.index}
            onClick={(e) => {
              e.preventDefault();
              startSeek(jp.index);
            }}
          >
            {jp.label}
          </a>
        ))}
      </nav>

      <input
        type="range"
        min={0}
        max={frames.length - 1}
        step={1}
        value={index}
        onChange={(e) => handleUserSetFrame(Number(e.target.value))}
        className={styles.range}
      />
    </div>
  );
}
