"use client";

import { useLayoutEffect, useRef, useState } from "react";

const DEFAULT_FONT_SIZE = 52;
const SINGLE_LINE_MIN_FONT_SIZE = 16;
const MULTI_LINE_MIN_FONT_SIZE = 24;
const MAX_LINES_FALLBACK = 2;
const LINE_HEIGHT = 1.02;
const SINGLE_LINE_SAFETY_PX = 10;

function clampLines(value?: number | string | null) {
  const parsed =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? Number.parseInt(value, 10)
        : Number.NaN;

  if (!Number.isFinite(parsed)) {
    return MAX_LINES_FALLBACK;
  }

  return Math.min(4, Math.max(1, Math.round(parsed)));
}

export default function FeatureCardHeadline({
  text,
  maxLines,
  scale = 1,
  align = "left",
}: {
  text: string;
  maxLines?: number | string | null;
  scale?: number;
  align?: "left" | "center" | "right";
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE * scale);
  const resolvedMaxLines = clampLines(maxLines);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const fitHeadline = () => {
      const target = ref.current;
      if (!target) {
        return;
      }

      const maxFontSize = DEFAULT_FONT_SIZE * scale;
      const minFontSize =
        (resolvedMaxLines === 1 ? SINGLE_LINE_MIN_FONT_SIZE : MULTI_LINE_MIN_FONT_SIZE) *
        scale;

      let low = minFontSize;
      let high = maxFontSize;
      let best = minFontSize;

      const fits = (size: number) => {
        target.style.fontSize = `${size}px`;
        target.style.lineHeight = String(LINE_HEIGHT);

        if (resolvedMaxLines === 1) {
          return target.scrollWidth <= target.clientWidth - SINGLE_LINE_SAFETY_PX;
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
    const rafA = window.requestAnimationFrame(fitHeadline);
    const rafB = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(fitHeadline);
    });

    const fontSet = document.fonts;
    void fontSet.ready.then(() => {
      fitHeadline();
    });

    const observer = new ResizeObserver(() => {
      fitHeadline();
    });

    observer.observe(element);
    if (element.parentElement) {
      observer.observe(element.parentElement);
    }

    return () => {
      window.cancelAnimationFrame(rafA);
      window.cancelAnimationFrame(rafB);
      observer.disconnect();
    };
  }, [resolvedMaxLines, scale, text]);

  return (
    <h3
      ref={ref}
      className="mt-11 overflow-hidden font-semibold tracking-[-0.03em] text-foreground"
      style={{
        fontSize: `${fontSize}px`,
        lineHeight: LINE_HEIGHT,
        width: "100%",
        maxWidth: "100%",
        whiteSpace: resolvedMaxLines === 1 ? "nowrap" : "normal",
        display: resolvedMaxLines === 1 ? "block" : "-webkit-box",
        WebkitLineClamp: resolvedMaxLines === 1 ? undefined : resolvedMaxLines,
        WebkitBoxOrient: resolvedMaxLines === 1 ? undefined : "vertical",
        textAlign: align,
        paddingInline: resolvedMaxLines === 1 ? "0.08em" : undefined,
      }}
    >
      {text}
    </h3>
  );
}
