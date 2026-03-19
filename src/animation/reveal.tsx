"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import type { AnimationDirection, AnimationSpeed, AnimationType } from "../lib/animation";

type RevealProps = {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
  direction?: AnimationDirection;
  speed?: AnimationSpeed;
  delayMs?: number;
  distancePx?: number;
  once?: boolean;
  trigger?: "mount" | "viewport";
};

function resolveDuration(speed: AnimationSpeed) {
  switch (speed) {
    case "fast":
      return "1100ms";
    case "extra-slow":
      return "3000ms";
    case "slow":
      return "2200ms";
    default:
      return "1600ms";
  }
}

export function getRevealClassNames({
  animation,
  direction,
  isVisible,
  className,
}: {
  animation: AnimationType;
  direction: AnimationDirection;
  isVisible: boolean;
  className?: string;
}) {
  return [
    "reveal-element",
    animation !== "none" ? `reveal-${animation}` : "",
    `reveal-from-${direction}`,
    isVisible ? "is-visible" : "",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");
}

export default function Reveal({
  children,
  className,
  animation = "none",
  direction = "up",
  speed = "medium",
  delayMs = 0,
  distancePx = 56,
  once = true,
  trigger = "viewport",
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(animation === "none");

  useEffect(() => {
    if (animation === "none") {
      return;
    }

    if (trigger === "mount") {
      const frame = window.requestAnimationFrame(() => {
        setIsVisible(true);
      });

      return () => {
        window.cancelAnimationFrame(frame);
      };
    }

    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);

          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.18,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [animation, once, trigger]);

  return (
    <div
      ref={ref}
      className={getRevealClassNames({ animation, direction, isVisible, className })}
      style={
        {
          "--reveal-duration": resolveDuration(speed),
          "--reveal-delay": `${delayMs}ms`,
          "--reveal-distance": `${distancePx}px`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
