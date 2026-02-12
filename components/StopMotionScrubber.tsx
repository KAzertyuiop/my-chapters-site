"use client";

import { useEffect, useRef, useState } from "react";
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
const TOTAL_FRAMES = 64;

// ✅ Add hold durations (ms) for specific frames (typically your link frames)
const HOLDS_MS: Record<number, number> = {
  0: 1200,  // hold 1.2s on frame 0
  20: 800,  // hold 0.8s on frame 20
  30: 1500, // hold 1.5s on frame 30
  40: 900,  // hold 0.9s on frame 40
  63: 1800, // hold 1.8s on frame 63
};

export default function StopMotionScrubber() {
  const frames = Array.from({ length: TOTAL_FRAMES }, (_, i) =>
    `/svg/e${String(i + 1).padStart(2, "0")}.svg`
  );

  const jumpPoints: JumpPoint[] = [
    { label: "Meenemen", index: 0 },
    { label: "Opbergen", index: 20 },
    { label: "Ophijsen", index: 30 },
    { label: "Verplaatsen", index: 40 },
    { label: "Meenemen", index: 63 },
  ];

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(AUTOPLAY);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Seeking state
  const seekTimerRef = useRef<NodeJS.Timeout | null>(null);
  const seekTargetRef = useRef<number | null>(null);

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

  // Autoplay logic (✅ now includes holds)
  useEffect(() => {
    if (!playing) return;

    const baseInterval = 1000 / FPS;
    const hold = HOLDS_MS[index] ?? 0; // extra pause on specific frames
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
    stopSeek(); // if user hits play/pause mid-seek, stop seeking
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
