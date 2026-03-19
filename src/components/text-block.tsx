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
      return "text-[2.1rem] md:text-[2.5rem]";
    case "large":
    case "gross":
    case "groß":
      return "text-[3rem] md:text-[3.6rem]";
    case "xl":
      return "text-[3.5rem] md:text-[4.2rem]";
    default:
      return "text-[2.5rem] md:text-[3rem]";
  }
}

function resolveTextSize(value: StoryblokSingleOptionField) {
  const size = resolveSingleOption(value, "medium").trim().toLowerCase();

  switch (size) {
    case "small":
    case "klein":
      return "text-[1rem] leading-8";
    case "large":
    case "gross":
    case "groß":
      return "text-[1.2rem] leading-9";
    default:
      return "text-[1.08rem] leading-8";
  }
}

export default function TextBlock({ blok }: { blok: TextBlockBlok }) {
  const headlineColor = resolveColor(blok.headline_color, "#29473d");
  const textColor = resolveColor(blok.text_color, "rgba(41,71,61,0.78)");
  const headlineAlign = resolveAlignClass(blok.headline_align);
  const textAlign = resolveAlignClass(blok.text_align);

  return (
    <section
      {...storyblokEditable(blok)}
      className="w-full py-2"
    >
      {blok.headline ? (
        <h2
          className={[
            "font-display leading-[0.96] tracking-[-0.03em]",
            resolveHeadlineSize(blok.headline_size),
            blok.headline_bold ? "font-bold" : "font-semibold",
            headlineAlign,
          ].join(" ")}
          style={{ color: headlineColor }}
        >
          {blok.headline}
        </h2>
      ) : null}

      <div
        className={[
          "mt-5 whitespace-pre-line",
          resolveTextSize(blok.text_size),
          textAlign,
        ].join(" ")}
        style={{ color: textColor }}
      >
        {blok.text || "Bitte Text in Storyblok eintragen."}
      </div>
    </section>
  );
}
