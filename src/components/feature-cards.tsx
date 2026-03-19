import type { CSSProperties } from "react";
import { StoryblokServerComponent, storyblokEditable } from "@storyblok/react/rsc";
import type { SbBlokData } from "@storyblok/react/rsc";

type StoryblokColorField = {
  value?: string;
  color?: string;
  plugin?: string;
  rgba?: string;
};

type FeatureCardsBlok = SbBlokData & {
  background_color?: StoryblokColorField | string;
  items?: SbBlokData[];
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

export default function FeatureCards({ blok }: { blok: FeatureCardsBlok }) {
  const items = blok.items?.slice(0, 4) ?? [];
  const backgroundColor = resolveColor(blok.background_color, "#edf8f5");
  const desktopColumns =
    items.length >= 4 ? "repeat(4, minmax(0, 1fr))" : `repeat(${Math.max(items.length, 1)}, minmax(0, 1fr))`;

  return (
    <section
      {...storyblokEditable(blok)}
      className="w-full"
      style={
        {
          "--feature-cards-bg": backgroundColor,
          "--feature-cards-columns": desktopColumns,
        } as CSSProperties
      }
    >
      <div className="mx-auto grid w-full gap-8 md:grid-cols-2 lg:gap-10 xl:grid-cols-[var(--feature-cards-columns)]">
        {items.length > 0 ? (
          items.map((item) => <StoryblokServerComponent blok={item} key={item._uid} />)
        ) : (
          <div
            className="w-full rounded-[1.9rem] border border-dashed border-[rgba(41,71,61,0.16)] px-7 py-9 text-center text-sm text-[rgba(41,71,61,0.72)]"
            style={{ backgroundColor }}
          >
            Fuege bis zu vier `feature_card`-Elemente hinzu.
          </div>
        )}
      </div>
    </section>
  );
}
