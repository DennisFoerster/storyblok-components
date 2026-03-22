import type { CSSProperties } from "react";
import Image from "next/image";
import { storyblokEditable } from "@storyblok/react/rsc";
import type { SbBlokData } from "@storyblok/react/rsc";

import { resolveWidthMode, resolveSingleOption, type StoryblokSingleOptionField } from "../lib/width";

type StoryblokAssetField = {
  filename?: string;
  alt?: string;
};

type ImageBlockBlok = SbBlokData & {
  image?: StoryblokAssetField;
  width_percent?: number | string;
  align?: StoryblokSingleOptionField;
  container_width?: StoryblokSingleOptionField;
};

function resolveImageDimensions(asset?: StoryblokAssetField) {
  const filename = asset?.filename;

  if (!filename) {
    return { width: 1600, height: 1000 };
  }

  const match = filename.match(/\/f\/\d+\/(\d+)x(\d+)\//);
  if (!match) {
    return { width: 1600, height: 1000 };
  }

  const width = Number(match[1]);
  const height = Number(match[2]);

  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    return { width: 1600, height: 1000 };
  }

  return { width, height };
}

function resolveWidthPercent(value?: number | string) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.min(100, Math.max(1, value));
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return Math.min(100, Math.max(1, parsed));
    }
  }

  return 100;
}

function resolveAlignmentStyles(value: StoryblokSingleOptionField): CSSProperties {
  const align = resolveSingleOption(value, "left").trim().toLowerCase();

  if (align === "center" || align === "mittig" || align === "mitte") {
    return {
      marginInline: "auto",
    };
  }

  if (align === "right" || align === "rechts") {
    return {
      marginLeft: "auto",
      marginRight: 0,
    };
  }

  return {
    marginLeft: 0,
    marginRight: "auto",
  };
}

export default function ImageBlock({ blok }: { blok: ImageBlockBlok }) {
  const imageDimensions = resolveImageDimensions(blok.image);
  const widthPercent = resolveWidthPercent(blok.width_percent);
  const alignmentStyles = resolveAlignmentStyles(blok.align);
  const widthMode = resolveWidthMode(blok.container_width);

  return (
    <section {...storyblokEditable(blok)} className="w-full py-2">
      <div className={widthMode === "full" ? "sb-section-width-full" : "w-full"}>
        <div
          className="overflow-hidden rounded-[2rem]"
          style={{
            width: `${widthPercent}%`,
            ...alignmentStyles,
          }}
        >
        {blok.image?.filename ? (
          <Image
            src={blok.image.filename}
            alt={blok.image.alt || "Bild"}
            width={imageDimensions.width}
            height={imageDimensions.height}
            className="h-auto w-full object-cover"
          />
        ) : (
            <div className="flex min-h-[220px] items-center justify-center rounded-[2rem] border border-[rgba(53,88,77,0.12)] bg-[linear-gradient(135deg,rgba(255,255,255,0.68),rgba(240,230,217,0.92))]">
              <div className="h-[72%] w-[72%] rounded-[1.5rem] border border-white/60 bg-white/35" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
