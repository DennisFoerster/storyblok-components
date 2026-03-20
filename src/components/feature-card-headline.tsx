"use client";

import { useEffect, useRef, useState } from "react";

const DEFAULT_FONT_SIZE = 52;
const MIN_FONT_SIZE = 28;
const MAX_LINES_FALLBACK = 2;
const LINE_HEIGHT = 1.02;

function clampLines(value?: number) {
  if (!Number.isFinite(value)) {
    return MAX_LINES_FALLBACK;
  }

  return Math.min(4, Math.max(1, Math.round(value!)));
}

export default function FeatureCardHeadline({
  text,
  maxLines,
}: {
  text: string;
  maxLines?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);
  const resolvedMaxLines = clampLines(maxLines);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const fitHeadline = () => {
      const target = ref.current;
      if (!target) {
        return;
      }

      let low = MIN_FONT_SIZE;
      let high = DEFAULT_FONT_SIZE;
      let best = MIN_FONT_SIZE;

      const fits = (size: number) => {
        target.style.fontSize = `${size}px`;
        target.style.lineHeight = String(LINE_HEIGHT);

        if (resolvedMaxLines === 1) {
          return target.scrollWidth <= target.clientWidth + 1;
        }

        const computed = window.getComputedStyle(target);
        const lineHeight = Number.parseFloat(computed.lineHeight);
        const maxHeight = lineHeight * resolvedMaxLines + 1;
        return target.scrollHeight <= maxHeight;
      };

      while (low <= high) {
        const mid = Math.floor((low + high) / 2);

        if (fits(mid)) {
          best = mid;
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }

      setFontSize(best);
    };

    fitHeadline();

    const observer = new ResizeObserver(() => {
      fitHeadline();
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [resolvedMaxLines, text]);

  return (
    <h3
      ref={ref}
      className="mt-11 overflow-hidden font-semibold tracking-[-0.03em] text-foreground"
      style={{
        fontSize: `${fontSize}px`,
        lineHeight: LINE_HEIGHT,
        whiteSpace: resolvedMaxLines === 1 ? "nowrap" : "normal",
        display: "-webkit-box",
        WebkitLineClamp: resolvedMaxLines,
        WebkitBoxOrient: "vertical",
      }}
    >
      {text}
    </h3>
  );
}
