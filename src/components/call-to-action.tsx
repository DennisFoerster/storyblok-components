import type { CSSProperties } from "react";
import { storyblokEditable } from "@storyblok/react/rsc";
import type { SbBlokData } from "@storyblok/react/rsc";

import { resolveWidthMode, resolveSingleOption, type StoryblokSingleOptionField } from "../lib/width";

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

type CallToActionBlok = SbBlokData & {
  eyebrow?: string;
  headline?: string;
  text?: string;
  primary_label?: string;
  primary_link?: StoryblokLinkField | string;
  secondary_label?: string;
  secondary_link?: StoryblokLinkField | string;
  layout?: StoryblokSingleOptionField;
  content_align?: StoryblokSingleOptionField;
  container_width?: StoryblokSingleOptionField;
  headline_size?: StoryblokSingleOptionField;
  text_size?: StoryblokSingleOptionField;
  padding_size?: StoryblokSingleOptionField;
  background_color?: StoryblokColorField | string;
  accent_color?: StoryblokColorField | string;
  eyebrow_color?: StoryblokColorField | string;
  headline_color?: StoryblokColorField | string;
  text_color?: StoryblokColorField | string;
  primary_background_color?: StoryblokColorField | string;
  primary_text_color?: StoryblokColorField | string;
  secondary_background_color?: StoryblokColorField | string;
  secondary_text_color?: StoryblokColorField | string;
  panel_style?: StoryblokSingleOptionField;
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

function resolveHeadlineSize(value: StoryblokSingleOptionField) {
  const size = resolveSingleOption(value, "medium").trim().toLowerCase();

  switch (size) {
    case "small":
    case "klein":
      return {
        fontSize: "clamp(2.2rem, 3.8vw, 2.9rem)",
        lineHeight: 0.98,
      };
    case "large":
    case "gross":
    case "groß":
      return {
        fontSize: "clamp(3.2rem, 5vw, 4.3rem)",
        lineHeight: 0.92,
      };
    default:
      return {
        fontSize: "clamp(2.7rem, 4.5vw, 3.5rem)",
        lineHeight: 0.95,
      };
  }
}

function resolveTextSize(value: StoryblokSingleOptionField) {
  const size = resolveSingleOption(value, "medium").trim().toLowerCase();

  switch (size) {
    case "small":
    case "klein":
      return {
        fontSize: "var(--sb-body-text-small-size)",
        lineHeight: "var(--sb-body-text-small-line-height)",
      };
    case "large":
    case "gross":
    case "groß":
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

function resolvePadding(value: StoryblokSingleOptionField) {
  const size = resolveSingleOption(value, "medium").trim().toLowerCase();

  switch (size) {
    case "small":
    case "klein":
      return {
        paddingInline: "1.75rem",
        paddingBlock: "2rem",
      };
    case "large":
    case "gross":
    case "groß":
      return {
        paddingInline: "clamp(2rem, 4vw, 4rem)",
        paddingBlock: "clamp(2.5rem, 5vw, 4rem)",
      };
    default:
      return {
        paddingInline: "clamp(1.9rem, 4vw, 3rem)",
        paddingBlock: "clamp(2.2rem, 4.5vw, 3.2rem)",
      };
  }
}

function resolveWidth(value: StoryblokSingleOptionField) {
  const width = resolveSingleOption(value, "wide").trim().toLowerCase();

  switch (width) {
    case "narrow":
    case "schmal":
      return { maxWidth: "48rem" };
    case "full":
    case "voll":
      return { maxWidth: "100%", fullBleed: true };
    default:
      return { maxWidth: "74rem" };
  }
}

function resolveLayout(value: StoryblokSingleOptionField) {
  const layout = resolveSingleOption(value, "split").trim().toLowerCase();
  return layout === "centered" || layout === "zentriert" ? "centered" : "split";
}

function resolveAlign(value: StoryblokSingleOptionField) {
  const align = resolveSingleOption(value, "left").trim().toLowerCase();

  if (align === "center" || align === "mittig" || align === "mitte") {
    return "center";
  }

  if (align === "right" || align === "rechts") {
    return "right";
  }

  return "left";
}

function resolvePanelStyle(value: StoryblokSingleOptionField) {
  const panelStyle = resolveSingleOption(value, "glow").trim().toLowerCase();

  switch (panelStyle) {
    case "outline":
    case "linie":
      return {
        border: "1px solid rgba(53,88,77,0.18)",
        boxShadow: "0 18px 48px rgba(53,88,77,0.08)",
      };
    case "soft":
    case "weich":
      return {
        border: "1px solid rgba(255,255,255,0.55)",
        boxShadow: "0 14px 34px rgba(53,88,77,0.06)",
      };
    default:
      return {
        border: "1px solid rgba(255,255,255,0.44)",
        boxShadow: "0 26px 70px rgba(53,88,77,0.14)",
      };
  }
}

export default function CallToAction({ blok }: { blok: CallToActionBlok }) {
  const layout = resolveLayout(blok.layout);
  const contentAlign = resolveAlign(blok.content_align);
  const effectiveAlign = layout === "centered" ? "center" : contentAlign;
  const backgroundColor = resolveColor(blok.background_color, "#f7f1e7");
  const accentColor = resolveColor(blok.accent_color, "#caa36d");
  const eyebrowColor = resolveColor(blok.eyebrow_color, "#35584d");
  const headlineColor = resolveColor(blok.headline_color, "#29473d");
  const textColor = resolveColor(blok.text_color, "rgba(41,71,61,0.8)");
  const primaryBackgroundColor = resolveColor(blok.primary_background_color, "#35584d");
  const primaryTextColor = resolveColor(blok.primary_text_color, "#ffffff");
  const secondaryBackgroundColor = resolveColor(blok.secondary_background_color, "rgba(255,255,255,0.78)");
  const secondaryTextColor = resolveColor(blok.secondary_text_color, "#29473d");
  const headlineSizeStyles = resolveHeadlineSize(blok.headline_size);
  const textSizeStyles = resolveTextSize(blok.text_size);
  const paddingStyles = resolvePadding(blok.padding_size);
  const widthStyles = resolveWidth(blok.container_width);
  const widthMode = resolveWidthMode(blok.container_width);
  const panelStyles = resolvePanelStyle(blok.panel_style);
  const hasPrimaryCta = Boolean(blok.primary_label && blok.primary_link);
  const hasSecondaryCta = Boolean(blok.secondary_label && blok.secondary_link);

  const contentStyles: CSSProperties =
    effectiveAlign === "center"
      ? { textAlign: "center", marginInline: "auto" }
      : effectiveAlign === "right"
        ? { textAlign: "right", marginLeft: "auto" }
        : { textAlign: "left" };

  return (
    <section {...storyblokEditable(blok)} className="w-full py-2">
      <div
        className={[
          "relative overflow-hidden rounded-[2.4rem]",
          widthMode === "full" ? "sb-section-width-full" : "mx-auto",
        ].join(" ")}
        style={{
          background:
            "radial-gradient(circle at top left, rgba(255,255,255,0.55), transparent 28%), linear-gradient(145deg, rgba(255,255,255,0.28), transparent 52%), linear-gradient(180deg, transparent, rgba(255,255,255,0.18))",
          backgroundColor,
          ...(widthMode === "full" ? {} : widthStyles),
          ...paddingStyles,
          ...panelStyles,
        }}
      >
        <div
          className="pointer-events-none absolute -left-12 top-0 h-36 w-36 rounded-full blur-2xl"
          style={{ backgroundColor: `${accentColor}55` }}
        />
        <div
          className="pointer-events-none absolute bottom-0 right-0 h-44 w-44 rounded-full blur-3xl"
          style={{ backgroundColor: `${accentColor}33` }}
        />
        <div
          className="pointer-events-none absolute right-[12%] top-[16%] h-16 w-16 rounded-full border"
          style={{
            borderColor: `${accentColor}66`,
            backgroundColor: `${accentColor}22`,
          }}
        />

        <div
          className={layout === "split" ? "grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end" : ""}
        >
          <div className={layout === "split" ? "" : "mx-auto max-w-3xl"} style={contentStyles}>
            {blok.eyebrow ? (
              <p
                className="text-xs font-semibold uppercase tracking-[0.28em]"
                style={{ color: eyebrowColor }}
              >
                {blok.eyebrow}
              </p>
            ) : null}

            <h2
              className="mt-4 max-w-4xl font-display font-semibold tracking-[-0.04em]"
              style={{
                color: headlineColor,
                fontSize: headlineSizeStyles.fontSize,
                lineHeight: headlineSizeStyles.lineHeight,
                ...(effectiveAlign === "center"
                  ? { marginInline: "auto" }
                  : effectiveAlign === "right"
                    ? { marginLeft: "auto" }
                    : {}),
              }}
            >
              {blok.headline || "Zeit für den nächsten Schritt"}
            </h2>

            {blok.text ? (
              <div
                className="mt-6 max-w-3xl whitespace-pre-line"
                style={{
                  color: textColor,
                  fontSize: textSizeStyles.fontSize,
                  lineHeight: textSizeStyles.lineHeight,
                  ...(effectiveAlign === "center"
                    ? { marginInline: "auto" }
                    : effectiveAlign === "right"
                      ? { marginLeft: "auto" }
                      : {}),
                }}
              >
                {blok.text}
              </div>
            ) : null}
          </div>

          {(hasPrimaryCta || hasSecondaryCta) ? (
            <div
              className={[
                "mt-8 flex flex-wrap gap-4",
                effectiveAlign === "center"
                  ? "justify-center"
                  : effectiveAlign === "right"
                    ? "justify-end"
                    : "justify-start",
              ].join(" ")}
              style={effectiveAlign === "right" ? { marginLeft: "auto" } : effectiveAlign === "center" ? { marginInline: "auto" } : undefined}
            >
              {hasPrimaryCta ? (
                <a
                  href={resolveHref(blok.primary_link)}
                  className="inline-flex min-h-12 items-center justify-center rounded-[1rem] px-6 py-3 text-sm font-semibold transition hover:brightness-[0.97]"
                  style={{
                    backgroundColor: primaryBackgroundColor,
                    color: primaryTextColor,
                    boxShadow: `0 16px 34px ${accentColor}33`,
                  }}
                >
                  {blok.primary_label}
                </a>
              ) : null}

              {hasSecondaryCta ? (
                <a
                  href={resolveHref(blok.secondary_link)}
                  className="inline-flex min-h-12 items-center justify-center rounded-[1rem] px-6 py-3 text-sm font-semibold transition hover:bg-white"
                  style={{
                    backgroundColor: secondaryBackgroundColor,
                    color: secondaryTextColor,
                    border: "1px solid rgba(53,88,77,0.12)",
                    boxShadow: "0 12px 24px rgba(53,88,77,0.08)",
                  }}
                >
                  {blok.secondary_label}
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
