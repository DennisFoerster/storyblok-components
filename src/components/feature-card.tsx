import Image from "next/image";
import { storyblokEditable } from "@storyblok/react/rsc";
import type { SbBlokData } from "@storyblok/react/rsc";

type StoryblokAssetField = {
  filename?: string;
  alt?: string;
};

type StoryblokSingleOptionField =
  | string
  | { value?: string; label?: string; name?: string }
  | undefined;

type FeatureCardBlok = SbBlokData & {
  headline?: string;
  text?: string;
  icon?: StoryblokAssetField;
  text_size?: StoryblokSingleOptionField;
};

function resolveSingleOption(value: StoryblokSingleOptionField, fallback: string) {
  if (!value) {
    return fallback;
  }

  if (typeof value === "string") {
    return value;
  }

  return value.value || value.label || value.name || fallback;
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

function resolveImageDimensions(asset?: StoryblokAssetField) {
  const filename = asset?.filename;

  if (!filename) {
    return { width: 80, height: 80 };
  }

  const match = filename.match(/\/f\/\d+\/(\d+)x(\d+)\//);
  if (!match) {
    return { width: 80, height: 80 };
  }

  const width = Number(match[1]);
  const height = Number(match[2]);

  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    return { width: 80, height: 80 };
  }

  return { width, height };
}

export default function FeatureCard({ blok }: { blok: FeatureCardBlok }) {
  const iconDimensions = resolveImageDimensions(blok.icon);
  const textSizeStyles = resolveTextSize(blok.text_size);

  return (
    <article
      {...storyblokEditable(blok)}
      className="flex h-full w-full flex-col rounded-[1.9rem] border border-[rgba(41,71,61,0.1)] px-8 py-8 lg:px-10 lg:py-10 shadow-[0_16px_36px_rgba(41,71,61,0.05)]"
      style={{ backgroundColor: "var(--feature-cards-bg, #edf8f5)" }}
    >
      <div className="flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full border border-[rgba(41,71,61,0.12)] bg-white/55">
        {blok.icon?.filename ? (
          <Image
            src={blok.icon.filename}
            alt={blok.icon.alt || blok.headline || "Icon"}
            width={iconDimensions.width}
            height={iconDimensions.height}
            className="h-14 w-14 object-contain"
          />
        ) : (
          <div className="h-4.5 w-4.5 rounded-full bg-[rgba(88,143,117,0.72)]" />
        )}
      </div>

      <h3 className="mt-11 text-[2rem] font-semibold leading-[1.02] tracking-[-0.03em] text-foreground">
        {blok.headline || "Uberschrift"}
      </h3>

      <p
        className="mt-5 whitespace-pre-line text-[rgba(41,71,61,0.82)]"
        style={{
          fontSize: textSizeStyles.fontSize,
          lineHeight: textSizeStyles.lineHeight,
        }}
      >
        {blok.text || "Fuege hier einen erklaerenden Text in Storyblok hinzu."}
      </p>
    </article>
  );
}
