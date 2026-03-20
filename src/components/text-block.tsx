import { storyblokEditable } from "@storyblok/react/rsc";
import type { SbBlokData } from "@storyblok/react/rsc";

type StoryblokColorField = {
  value?: string;
  color?: string;
  plugin?: string;
  rgba?: string;
};

type StoryblokSingleOptionField = string | { value?: string } | undefined;

type TextBlockBlok = SbBlokData & {
  headline?: string;
  headline_color?: StoryblokColorField | string;
  headline_size?: StoryblokSingleOptionField;
  headline_bold?: boolean;
  headline_align?: StoryblokSingleOptionField;
  text?: string;
  text_color?: StoryblokColorField | string;
  text_size?: StoryblokSingleOptionField;
  text_align?: StoryblokSingleOptionField;
  container_width?: StoryblokSingleOptionField;
  surface_style?: StoryblokSingleOptionField;
  background_color?: StoryblokColorField | string;
  padding_size?: StoryblokSingleOptionField;
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

function resolveSingleOption(value: StoryblokSingleOptionField, fallback: string) {
  if (!value) {
    return fallback;
  }

  if (typeof value === "string") {
    return value;
  }

  return value.value || fallback;
}

function resolveAlignClass(value: StoryblokSingleOptionField) {
  const align = resolveSingleOption(value, "left").trim().toLowerCase();

  if (align === "center" || align === "mittig" || align === "mitte") {
    return "text-center";
  }

  if (align === "right" || align === "rechts") {
    return "text-right";
  }

  return "text-left";
}

function resolveHeadlineSize(value: StoryblokSingleOptionField) {
  const size = resolveSingleOption(value, "medium").trim().toLowerCase();

  switch (size) {
    case "small":
    case "klein":
      return {
        fontSize: "clamp(2.1rem, 4vw, 2.5rem)",
        lineHeight: 0.96,
      };
    case "large":
    case "gross":
    case "groß":
      return {
        fontSize: "clamp(3rem, 5vw, 3.6rem)",
        lineHeight: 0.94,
      };
    case "xl":
      return {
        fontSize: "clamp(3.5rem, 6vw, 4.2rem)",
        lineHeight: 0.92,
      };
    default:
      return {
        fontSize: "clamp(2.5rem, 4.5vw, 3rem)",
        lineHeight: 0.96,
      };
  }
}

function resolveTextSize(value: StoryblokSingleOptionField) {
  const size = resolveSingleOption(value, "medium").trim().toLowerCase();

  switch (size) {
    case "small":
    case "klein":
      return {
        fontSize: "var(--sb-text-block-small-size)",
        lineHeight: "var(--sb-text-block-small-line-height)",
      };
    case "large":
    case "gross":
    case "groß":
      return {
        fontSize: "var(--sb-text-block-large-size)",
        lineHeight: "var(--sb-text-block-large-line-height)",
      };
    default:
      return {
        fontSize: "var(--sb-text-block-medium-size)",
        lineHeight: "var(--sb-text-block-medium-line-height)",
      };
  }
}

function resolveWidthClass(value: StoryblokSingleOptionField) {
  const width = resolveSingleOption(value, "medium").trim().toLowerCase();

  switch (width) {
    case "narrow":
    case "schmal":
      return { maxWidth: "42rem" };
    case "wide":
    case "breit":
      return { maxWidth: "72rem" };
    case "full":
    case "voll":
      return { maxWidth: "100%" };
    default:
      return { maxWidth: "56rem" };
  }
}

function resolvePaddingClass(value: StoryblokSingleOptionField) {
  const size = resolveSingleOption(value, "medium").trim().toLowerCase();

  switch (size) {
    case "none":
    case "keine":
      return {};
    case "small":
    case "klein":
    case "compact":
    case "kompakt":
      return {
        paddingInline: "1.5rem",
        paddingBlock: "1.5rem",
      };
    case "large":
    case "gross":
    case "groß":
      return {
        paddingInline: "3rem",
        paddingBlock: "3rem",
      };
    default:
      return {
        paddingInline: "2.25rem",
        paddingBlock: "2.25rem",
      };
  }
}

function resolveSurfaceClasses(value: StoryblokSingleOptionField) {
  const variant = resolveSingleOption(value, "plain").trim().toLowerCase();

  switch (variant) {
    case "soft":
    case "weich":
      return "rounded-[1.75rem] border border-[rgba(41,71,61,0.08)] shadow-[0_16px_36px_rgba(41,71,61,0.05)]";
    case "panel":
    case "karte":
      return "rounded-[1.9rem] border border-[rgba(41,71,61,0.12)] shadow-[0_20px_44px_rgba(41,71,61,0.07)]";
    case "line":
    case "linie":
      return "border-l-[3px] border-[rgba(41,71,61,0.18)] pl-6 md:pl-8";
    default:
      return "";
  }
}

export default function TextBlock({ blok }: { blok: TextBlockBlok }) {
  const headlineColor = resolveColor(blok.headline_color, "#29473d");
  const textColor = resolveColor(blok.text_color, "rgba(41,71,61,0.78)");
  const backgroundColor = resolveColor(blok.background_color, "transparent");
  const headlineAlign = resolveAlignClass(blok.headline_align);
  const textAlign = resolveAlignClass(blok.text_align);
  const headlineSizeStyles = resolveHeadlineSize(blok.headline_size);
  const textSizeStyles = resolveTextSize(blok.text_size);
  const widthStyles = resolveWidthClass(blok.container_width);
  const paddingStyles = resolvePaddingClass(blok.padding_size);
  const surfaceClasses = resolveSurfaceClasses(blok.surface_style);
  const hasHeadline = Boolean(blok.headline?.trim());

  return (
    <section
      {...storyblokEditable(blok)}
      className="w-full py-2"
    >
      <div
        className={[
          "mx-auto w-full",
          surfaceClasses,
        ].join(" ")}
        style={{
          backgroundColor,
          ...widthStyles,
          ...paddingStyles,
        }}
      >
        {hasHeadline ? (
          <h2
            className={[
              "font-display tracking-[-0.03em]",
              headlineAlign,
            ].join(" ")}
            style={{
              color: headlineColor,
              fontSize: headlineSizeStyles.fontSize,
              lineHeight: headlineSizeStyles.lineHeight,
              fontWeight: blok.headline_bold ? 700 : 400,
            }}
          >
            {blok.headline}
          </h2>
        ) : null}

        <div
          className={[
            hasHeadline ? "mt-5" : "",
            "whitespace-pre-line",
            textAlign,
          ].join(" ")}
          style={{
            color: textColor,
            fontSize: textSizeStyles.fontSize,
            lineHeight: textSizeStyles.lineHeight,
          }}
        >
          {blok.text || "Bitte Text in Storyblok eintragen."}
        </div>
      </div>
    </section>
  );
}
