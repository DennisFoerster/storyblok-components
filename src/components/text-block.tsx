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
        fontSize: "1rem",
        lineHeight: 1.8,
      };
    case "large":
    case "gross":
    case "groß":
      return {
        fontSize: "1.2rem",
        lineHeight: 1.95,
      };
    default:
      return {
        fontSize: "1.08rem",
        lineHeight: 1.85,
      };
  }
}

export default function TextBlock({ blok }: { blok: TextBlockBlok }) {
  const headlineColor = resolveColor(blok.headline_color, "#29473d");
  const textColor = resolveColor(blok.text_color, "rgba(41,71,61,0.78)");
  const headlineAlign = resolveAlignClass(blok.headline_align);
  const textAlign = resolveAlignClass(blok.text_align);
  const headlineSizeStyles = resolveHeadlineSize(blok.headline_size);
  const textSizeStyles = resolveTextSize(blok.text_size);

  return (
    <section
      {...storyblokEditable(blok)}
      className="w-full py-2"
    >
      {blok.headline ? (
        <h2
          className={[
            "font-display tracking-[-0.03em]",
            blok.headline_bold ? "font-bold" : "font-semibold",
            headlineAlign,
          ].join(" ")}
          style={{
            color: headlineColor,
            fontSize: headlineSizeStyles.fontSize,
            lineHeight: headlineSizeStyles.lineHeight,
          }}
        >
          {blok.headline}
        </h2>
      ) : null}

      <div
        className={[
          "mt-5 whitespace-pre-line",
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
    </section>
  );
}
