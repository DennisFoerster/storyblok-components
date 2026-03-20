import type { CSSProperties } from "react";
import Image from "next/image";
import { storyblokEditable } from "@storyblok/react/rsc";
import type { SbBlokData } from "@storyblok/react/rsc";

import Reveal from "../animation/reveal";
import {
  resolveAnimationDelayMs,
  resolveAnimationDistance,
  resolveAnimationDirection,
  resolveAnimationSpeed,
  resolveAnimationType,
  type StoryblokSingleOptionField,
} from "../lib/animation";

type StoryblokAssetField = {
  filename?: string;
  alt?: string;
};

type StoryblokColorField = {
  value?: string;
  color?: string;
  plugin?: string;
  rgba?: string;
};

type StoryblokLinkField = {
  cached_url?: string;
  url?: string;
  linktype?: string;
  story?: {
    url?: string;
    full_slug?: string;
  };
};

type HeroBlok = SbBlokData & {
  eyebrow?: string;
  headline?: string;
  text?: string;
  cta_label?: string;
  cta_link?: StoryblokLinkField | string;
  image?: StoryblokAssetField;
  background_color?: StoryblokColorField | string;
  accent_color?: StoryblokColorField | string;
  headline_color?: StoryblokColorField | string;
  text_color?: StoryblokColorField | string;
  cta_background_color?: StoryblokColorField | string;
  cta_text_color?: StoryblokColorField | string;
  headline_size?: string;
  text_size?: string;
  image_animation?: StoryblokSingleOptionField;
  image_animation_direction?: StoryblokSingleOptionField;
  image_animation_speed?: StoryblokSingleOptionField;
  image_animation_delay?: string | number;
  image_animation_distance?: string | number;
};

function resolveColor(
  color: StoryblokColorField | string | undefined,
  fallback: string,
) {
  if (!color) {
    return fallback;
  }

  if (typeof color === "string") {
    return color;
  }

  return color.value || color.color || color.rgba || color.plugin || fallback;
}

function resolveHref(link?: StoryblokLinkField | string, fallback = "#") {
  if (!link) {
    return fallback;
  }

  if (typeof link === "string") {
    return link.trim().length > 0 ? link : fallback;
  }

  if (link.story?.url) {
    return link.story.url.startsWith("/") ? link.story.url : `/${link.story.url}`;
  }

  if (link.story?.full_slug) {
    return link.story.full_slug === "home" ? "/" : `/${link.story.full_slug}`;
  }

  if (link.cached_url) {
    if (link.linktype === "story") {
      return link.cached_url === "home" ? "/" : `/${link.cached_url.replace(/^\/+/, "")}`;
    }

    return link.cached_url;
  }

  if (link.url) {
    return link.url;
  }

  return fallback;
}

function resolveHeadlineSize(size?: string) {
  switch (size) {
    case "small":
      return "text-[3.1rem] sm:text-[3.8rem]";
    case "medium":
      return "text-[3.6rem] sm:text-[4.5rem]";
    case "large":
      return "text-[4.2rem] sm:text-[5.2rem]";
    case "xl":
      return "text-[4.8rem] sm:text-[6rem]";
    default:
      return "text-[3.8rem] sm:text-[4.8rem]";
  }
}

function resolveTextSize(size?: string) {
  switch (size) {
    case "small":
      return {
        fontSize: "var(--sb-body-text-small-size)",
        lineHeight: "var(--sb-body-text-small-line-height)",
      };
    case "medium":
      return {
        fontSize: "var(--sb-body-text-medium-size)",
        lineHeight: "var(--sb-body-text-medium-line-height)",
      };
    case "large":
      return {
        fontSize: "var(--sb-body-text-large-size)",
        lineHeight: "var(--sb-body-text-large-line-height)",
      };
    default:
      return {
        fontSize: "var(--sb-body-text-medium-size)",
        lineHeight: "var(--sb-body-text-medium-line-height)",
      };
  }
}

function resolveImageDimensions(asset?: StoryblokAssetField) {
  const filename = asset?.filename;

  if (!filename) {
    return { width: 1100, height: 900 };
  }

  const match = filename.match(/\/f\/\d+\/(\d+)x(\d+)\//);
  if (!match) {
    return { width: 1100, height: 900 };
  }

  const width = Number(match[1]);
  const height = Number(match[2]);

  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    return { width: 1100, height: 900 };
  }

  return { width, height };
}

export default function Hero({ blok }: { blok: HeroBlok }) {
  const backgroundColor = resolveColor(blok.background_color, "#eee4d8");
  const accentColor = resolveColor(blok.accent_color, "#cda87f");
  const headlineColor = resolveColor(blok.headline_color, "#29473d");
  const textColor = resolveColor(blok.text_color, "#476359");
  const ctaBackgroundColor = resolveColor(blok.cta_background_color, headlineColor);
  const ctaTextColor = resolveColor(blok.cta_text_color, "#ffffff");
  const imageDimensions = resolveImageDimensions(blok.image);
  const imageAnimation = resolveAnimationType(blok.image_animation);
  const imageAnimationDirection = resolveAnimationDirection(blok.image_animation_direction);
  const imageAnimationSpeed = resolveAnimationSpeed(blok.image_animation_speed);
  const imageAnimationDelay = resolveAnimationDelayMs(blok.image_animation_delay, 120);
  const imageAnimationDistance = resolveAnimationDistance(blok.image_animation_distance, 56);
  const textSizeStyles = resolveTextSize(blok.text_size);

  return (
    <section
      {...storyblokEditable(blok)}
      className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 xl:gap-20"
      style={
        {
          "--hero-background": backgroundColor,
          "--hero-accent": accentColor,
          "--hero-headline": headlineColor,
          "--hero-text": textColor,
        } as CSSProperties
      }
    >
      <Reveal
        key={`${blok._uid}-${imageAnimation}-${imageAnimationDirection}-${imageAnimationSpeed}`}
        animation={imageAnimation}
        direction={imageAnimationDirection}
        speed={imageAnimationSpeed}
        delayMs={imageAnimationDelay}
        distancePx={imageAnimationDistance}
        trigger="mount"
      >
        <div
          className="relative min-h-[460px] overflow-hidden rounded-[3rem] shadow-[0_28px_70px_rgba(84,65,50,0.12)]"
          style={{ backgroundColor }}
        >
          <div className="hero-float-slow absolute left-[6%] top-[10%] h-44 w-44 rounded-full bg-white/30 blur-[2px]" />
          <div className="hero-float-mid absolute right-[9%] top-[13%] h-28 w-28 rounded-full border border-white/35 bg-white/25" />
          <div
            className="hero-float-fast absolute bottom-[12%] left-[10%] h-20 w-20 rounded-[1.7rem]"
            style={{ backgroundColor: accentColor }}
          />
          <div className="hero-float-mid absolute bottom-[18%] right-[13%] h-14 w-14 rounded-full bg-white/35" />
          <div className="absolute inset-[4%] overflow-hidden rounded-[2.5rem] border border-white/45 bg-white/12">
            {blok.image?.filename ? (
              <Image
                src={blok.image.filename}
                alt={blok.image.alt || blok.headline || "Hero Bild"}
                width={imageDimensions.width}
                height={imageDimensions.height}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.3),transparent_42%),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]">
                <div className="h-[72%] w-[72%] rounded-[2.5rem] border border-white/40 bg-white/18" />
              </div>
            )}
          </div>
        </div>
      </Reveal>

      <div className="max-w-2xl px-5 lg:px-0">
        {blok.eyebrow ? (
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: accentColor }}>
            {blok.eyebrow}
          </p>
        ) : null}
        <h1
          className={`max-w-2xl font-semibold leading-[0.94] tracking-[-0.04em] ${resolveHeadlineSize(
            blok.headline_size,
          )}`}
          style={{ color: headlineColor }}
        >
          {blok.headline || "Willkommen"}
        </h1>
        {blok.text ? (
          <p
            className="mt-7 max-w-xl whitespace-pre-line"
            style={{
              color: textColor,
              fontSize: textSizeStyles.fontSize,
              lineHeight: textSizeStyles.lineHeight,
            }}
          >
            {blok.text}
          </p>
        ) : null}
        {blok.cta_label && blok.cta_link ? (
          <a
            href={resolveHref(blok.cta_link)}
            className="mt-9 inline-flex items-center rounded-[0.9rem] px-6 py-3 text-sm font-semibold shadow-[0_12px_30px_rgba(84,65,50,0.1)] transition hover:brightness-[0.96]"
            style={{
              backgroundColor: ctaBackgroundColor,
              color: ctaTextColor,
            }}
          >
            {blok.cta_label}
          </a>
        ) : null}
      </div>
    </section>
  );
}
