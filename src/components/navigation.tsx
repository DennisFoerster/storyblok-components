import Image from "next/image";
import { storyblokEditable } from "@storyblok/react/rsc";
import type { SbBlokData } from "@storyblok/react/rsc";

type StoryblokLinkField = {
  cached_url?: string;
  url?: string;
  linktype?: string;
  story?: {
    url?: string;
    full_slug?: string;
  };
};

type StoryblokAssetField = {
  filename?: string;
  alt?: string;
};

type NavItemBlok = SbBlokData & {
  label?: string;
  link?: StoryblokLinkField | string;
};

type NavigationBlok = SbBlokData & {
  logo?: StoryblokAssetField;
  logo_label?: string;
  logo_link?: StoryblokLinkField | string;
  logo_width?: number | string;
  items?: NavItemBlok[];
  cta_label?: string;
  cta_link?: StoryblokLinkField | string;
};

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

function resolveLogoWidth(width?: number | string) {
  if (typeof width === "number" && width > 0) {
    return width;
  }

  if (typeof width === "string") {
    const parsed = Number(width);
    if (Number.isFinite(parsed) && parsed > 0) {
      return parsed;
    }
  }

  return 140;
}

function resolveLogoDimensions(asset?: StoryblokAssetField, width?: number | string) {
  const resolvedWidth = resolveLogoWidth(width);
  const filename = asset?.filename;

  if (!filename) {
    return { width: resolvedWidth, height: 48 };
  }

  const match = filename.match(/\/f\/\d+\/(\d+)x(\d+)\//);
  if (!match) {
    return { width: resolvedWidth, height: 48 };
  }

  const originalWidth = Number(match[1]);
  const originalHeight = Number(match[2]);

  if (!Number.isFinite(originalWidth) || !Number.isFinite(originalHeight) || originalWidth <= 0) {
    return { width: resolvedWidth, height: 48 };
  }

  return {
    width: resolvedWidth,
    height: Math.max(1, Math.round((resolvedWidth / originalWidth) * originalHeight)),
  };
}

export default function Navigation({ blok }: { blok: NavigationBlok }) {
  const logoHref = resolveHref(blok.logo_link, "/");
  const logoDimensions = resolveLogoDimensions(blok.logo, blok.logo_width);

  return (
    <header
      {...storyblokEditable(blok)}
      className="sticky top-0 z-20 w-full border-b border-[rgba(53,88,77,0.08)] bg-[rgba(250,246,239,0.96)]"
    >
      <div className="storyblok-sections-container grid grid-cols-1 items-center gap-5 py-5 lg:grid-cols-[auto_1fr_auto] lg:gap-10">
        <a href={logoHref} className="inline-flex items-center gap-3 text-[rgba(41,71,61,1)]">
          {blok.logo?.filename ? (
            <Image
              src={blok.logo.filename}
              alt={blok.logo.alt || blok.logo_label || "Logo"}
              width={logoDimensions.width}
              height={logoDimensions.height}
              className="h-auto w-auto object-contain"
            />
          ) : (
            <>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#35584d] text-sm font-semibold uppercase tracking-[0.18em] text-white">
                {blok.logo_label?.trim().slice(0, 2) || "HH"}
              </span>
              <span className="text-lg font-semibold tracking-tight">
                {blok.logo_label || "Homoeopathie Heinecke"}
              </span>
            </>
          )}
        </a>

        <nav className="flex flex-wrap items-center gap-x-8 gap-y-2 lg:justify-center">
          {blok.items?.map((item) => (
            <a
              {...storyblokEditable(item)}
              key={item._uid}
              href={resolveHref(item.link)}
              className="px-0 py-2 text-[1.05rem] font-medium tracking-[-0.01em] text-[rgba(41,71,61,0.86)] transition hover:text-[#35584d]"
            >
              {item.label || "Navigation"}
            </a>
          ))}
        </nav>

        {blok.cta_label ? (
          <a
            href={resolveHref(blok.cta_link)}
            className="inline-flex min-h-12 items-center justify-center self-start rounded-[0.9rem] bg-[#f2bf73] px-6 py-3 text-base font-medium text-white transition hover:bg-[#e7b15f] lg:self-auto"
          >
            {blok.cta_label}
          </a>
        ) : null}
      </div>
    </header>
  );
}
