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

type ImageTextSectionBlok = SbBlokData & {
  image?: StoryblokAssetField;
  image_right?: boolean;
  headline?: string;
  text?: string;
  headline_size?: StoryblokSingleOptionField;
  text_size?: StoryblokSingleOptionField;
  headline_align?: StoryblokSingleOptionField;
  text_align?: StoryblokSingleOptionField;
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

function resolveImageDimensions(asset?: StoryblokAssetField) {
  const filename = asset?.filename;

  if (!filename) {
    return { width: 1200, height: 900 };
  }

  const match = filename.match(/\/f\/\d+\/(\d+)x(\d+)\//);
  if (!match) {
    return { width: 1200, height: 900 };
  }

  const width = Number(match[1]);
  const height = Number(match[2]);

  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    return { width: 1200, height: 900 };
  }

  return { width, height };
}

function resolveHeadlineSize(value: StoryblokSingleOptionField) {
  const size = resolveSingleOption(value, "medium").trim().toLowerCase();

  switch (size) {
    case "small":
    case "klein":
      return "text-[2rem] sm:text-[2.3rem]";
    case "large":
    case "gross":
    case "groß":
      return "text-[2.7rem] sm:text-[3.2rem]";
    default:
      return "text-[2.3rem] sm:text-[2.7rem]";
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

function resolveTextAlign(value: StoryblokSingleOptionField) {
  const align = resolveSingleOption(value, "left").trim().toLowerCase();

  if (align === "center" || align === "mittig" || align === "mitte") {
    return "text-center";
  }

  if (align === "right" || align === "rechts") {
    return "text-right";
  }

  return "text-left";
}

function resolveTextBlockAlign(value: StoryblokSingleOptionField) {
  const align = resolveSingleOption(value, "left").trim().toLowerCase();

  if (align === "center" || align === "mittig" || align === "mitte") {
    return "items-center";
  }

  if (align === "right" || align === "rechts") {
    return "items-end";
  }

  return "items-start";
}

export default function ImageTextSection({ blok }: { blok: ImageTextSectionBlok }) {
  const imageDimensions = resolveImageDimensions(blok.image);
  const imageIsRight = Boolean(blok.image_right);
  const headlineAlign = resolveTextAlign(blok.headline_align);
  const textAlign = resolveTextAlign(blok.text_align);
  const textBlockAlign = resolveTextBlockAlign(blok.text_align ?? blok.headline_align);
  const textSizeStyles = resolveTextSize(blok.text_size);

  return (
    <section
      {...storyblokEditable(blok)}
      className="w-full overflow-hidden rounded-[2.2rem] border border-[rgba(53,88,77,0.08)] bg-[rgba(255,251,245,0.86)] shadow-[0_20px_50px_rgba(84,65,50,0.06)]"
    >
      <div className="grid items-center lg:grid-cols-2">
        <div className={imageIsRight ? "order-2" : "order-1"}>
          <div className="relative h-full min-h-[320px] bg-[linear-gradient(135deg,rgba(207,184,162,0.2),rgba(255,255,255,0.55))] lg:min-h-[460px]">
            {blok.image?.filename ? (
              <Image
                src={blok.image.filename}
                alt={blok.image.alt || blok.headline || "Bild"}
                width={imageDimensions.width}
                height={imageDimensions.height}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full min-h-[320px] items-center justify-center p-8 lg:min-h-[460px]">
                <div className="h-full min-h-[220px] w-full rounded-[1.8rem] border border-white/60 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.65),rgba(255,255,255,0.14))]" />
              </div>
            )}
          </div>
        </div>

        <div className={imageIsRight ? "order-1" : "order-2"}>
          <div className={`flex p-8 sm:p-10 lg:p-14 ${textBlockAlign}`}>
            <div className="w-full max-w-2xl">
              {blok.headline ? (
                <h2
                  className={`font-display font-semibold leading-[1] tracking-[-0.03em] text-foreground ${headlineAlign} ${resolveHeadlineSize(
                    blok.headline_size,
                  )}`}
                >
                  {blok.headline}
                </h2>
              ) : null}

              <div
                className={`mt-5 whitespace-pre-line text-[rgba(41,71,61,0.76)] ${textAlign}`}
                style={{
                  fontSize: textSizeStyles.fontSize,
                  lineHeight: textSizeStyles.lineHeight,
                }}
              >
                {blok.text || "Füge in Storyblok eine Überschrift, einen Text und ein Bild hinzu."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
