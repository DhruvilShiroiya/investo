"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

export type Article = {
  title: string;
  description?: string | null;
};

type Props = {
  articles: Article[];
  intervalMs?: number; // time between rotations
  heightClass?: string; // Tailwind height class for dialog, e.g. "h-28", "h-36"
  pauseOnHover?: boolean;
};

export default function NewsRotator({
  articles,
  intervalMs = 5000,
  heightClass = "h-36",
  pauseOnHover = true,
}: Props) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"idle" | "out" | "in">("idle");
  const pausedRef = useRef(false);
  const intervalRef = useRef<number | null>(null);
  const count = Math.max(0, articles?.length ?? 0);

  // ✅ Memoized advance function (no stale closure warnings)
  const advance = useCallback(
    (nextIndex?: number) => {
      if (count <= 1) return;
      setPhase("out");

      // duration of 'out' should match CSS below (300ms)
      window.setTimeout(() => {
        setIndex((i) => {
          if (typeof nextIndex === "number") return nextIndex % count;
          return (i + 1) % count;
        });
        setPhase("in");

        // after 'in' animation (300ms) return to idle
        window.setTimeout(() => setPhase("idle"), 300);
      }, 300);
    },
    [count]
  );

  // ✅ Auto-rotation interval (cleaned up + stable)
  useEffect(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (count > 1) {
      intervalRef.current = window.setInterval(() => {
        if (!pausedRef.current) advance();
      }, intervalMs);
    }

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [count, intervalMs, advance]);

  // Reset index and phase when articles change
  useEffect(() => {
    setIndex(0);
    setPhase("idle");
  }, [articles]);

  const current = count > 0 ? articles[index] : undefined;

  // Animation styles for transitions
  const contentStyle: React.CSSProperties = (() => {
    if (phase === "out") {
      return {
        transform: "translateY(-12px)",
        opacity: 0,
        transition: "transform 300ms ease, opacity 300ms ease",
      };
    }
    if (phase === "in") {
      return {
        transform: "translateY(0)",
        opacity: 1,
        transition: "transform 300ms ease, opacity 300ms ease",
      };
    }
    return {
      transform: "translateY(0)",
      opacity: 1,
      transition: "transform 300ms ease, opacity 300ms ease",
    };
  })();

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        role="dialog"
        aria-roledescription="news rotator"
        aria-label="Rotating news headlines"
        className={`relative ${heightClass} w-full bg-white rounded-2xl shadow border border-gray-200 overflow-hidden`}
        onMouseEnter={() => (pauseOnHover ? (pausedRef.current = true) : null)}
        onMouseLeave={() => (pauseOnHover ? (pausedRef.current = false) : null)}
      >
        {/* Single content area: always render only the current article */}
        <div className="absolute inset-0 flex items-center p-4">
          <div className="w-full" style={{ minHeight: 0 }}>
            <div style={contentStyle}>
              <h3 className="text-base font-semibold text-gray-900 leading-tight">
                {current?.title ?? "No title"}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
