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

type FooterLinkBlok = SbBlokData & {
  label?: string;
  link?: StoryblokLinkField | string;
};

type FooterBlok = SbBlokData & {
  text?: string;
  links?: FooterLinkBlok[];
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

export default function Footer({ blok }: { blok: FooterBlok }) {
  return (
    <footer
      {...storyblokEditable(blok)}
      className="mt-14 w-full border-t border-[rgba(53,88,77,0.08)] bg-[rgba(250,246,239,0.92)]"
    >
      <div className="storyblok-sections-container flex flex-col gap-8 py-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p
            className="text-[rgba(41,71,61,0.74)]"
            style={{
              fontSize: "var(--sb-body-text-small-size)",
              lineHeight: "var(--sb-body-text-small-line-height)",
            }}
          >
            {blok.text ||
              "© Homoeopathie Heinecke. Impressum, Datenschutz und Kontaktlinks lassen sich in Storyblok zentral pflegen."}
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 lg:justify-end">
          {blok.links?.map((item) => (
            <a
              {...storyblokEditable(item)}
              key={item._uid}
              href={resolveHref(item.link)}
              className="py-1 text-[0.98rem] font-medium text-[rgba(41,71,61,0.82)] transition hover:text-[#35584d]"
            >
              {item.label || "Link"}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
