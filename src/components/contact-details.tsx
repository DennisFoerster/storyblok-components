import type { CSSProperties, ReactNode } from "react";
import { storyblokEditable } from "@storyblok/react/rsc";
import type { SbBlokData } from "@storyblok/react/rsc";

type StoryblokSingleOptionField =
  | string
  | { value?: string; label?: string; name?: string }
  | undefined;

type ContactDetailsBlok = SbBlokData & {
  headline?: string;
  text?: string;
  headline_size?: StoryblokSingleOptionField;
  text_size?: StoryblokSingleOptionField;
  headline_bold?: boolean;
  address?: string;
  phone?: string;
  email?: string;
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

function resolveHeadlineSize(value: StoryblokSingleOptionField) {
  const size = resolveSingleOption(value, "medium").trim().toLowerCase();

  switch (size) {
    case "small":
    case "klein":
      return {
        fontSize: "clamp(2.3rem, 4.1vw, 3rem)",
        lineHeight: 1.04,
      };
    case "large":
    case "gross":
    case "groß":
      return {
        fontSize: "clamp(3.2rem, 5vw, 4.2rem)",
        lineHeight: 1,
      };
    default:
      return {
        fontSize: "clamp(2.8rem, 4.5vw, 3.6rem)",
        lineHeight: 1.02,
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

function PhoneIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" style={{ width: "2.35rem", height: "2.35rem" }}>
      <path
        d="M15.6 9.6c1.2-1.2 3.2-1.2 4.4 0l4.1 4.1c1.2 1.2 1.2 3.2 0 4.4l-2.4 2.4a2 2 0 0 0-.4 2.3c1.5 2.8 3.8 5.1 6.6 6.6a2 2 0 0 0 2.3-.4l2.4-2.4c1.2-1.2 3.2-1.2 4.4 0l4.1 4.1c1.2 1.2 1.2 3.2 0 4.4l-1.9 1.9c-2.1 2.1-5.2 2.9-8 2-6.2-2.1-11.7-7.6-13.8-13.8-.9-2.8-.1-5.9 2-8z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" style={{ width: "2.35rem", height: "2.35rem" }}>
      <path
        d="M24 42s10-11 10-19c0-5.5-4.5-10-10-10s-10 4.5-10 10c0 8 10 19 10 19z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="23" r="3.8" stroke="currentColor" strokeWidth="2.4" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" style={{ width: "2.35rem", height: "2.35rem" }}>
      <rect x="9" y="13" width="30" height="22" rx="2.5" stroke="currentColor" strokeWidth="2.4" />
      <path
        d="M11 16l13 11 13-11"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type ContactItemProps = {
  icon: ReactNode;
  title: string;
  content: string;
  href?: string;
};

function ContactItem({ icon, title, content, href }: ContactItemProps) {
  const titleStyles: CSSProperties = {
    fontSize: "clamp(2rem, 3vw, 2.6rem)",
    lineHeight: 1.02,
    letterSpacing: "-0.03em",
    color: "#3a4f47",
    fontFamily: "var(--font-playfair-display), Georgia, serif",
  };

  const contentStyles: CSSProperties = {
    marginTop: "0.95rem",
    whiteSpace: "pre-line",
    fontSize: "clamp(1.05rem, 1.75vw, 1.25rem)",
    lineHeight: 1.7,
    color: "rgba(41,71,61,0.74)",
  };

  return (
    <div className="sb-contact-details__item">
      <div
        className="sb-contact-details__icon-wrap"
        style={{
          backgroundColor: "#c2a48a",
          color: "#ffffff",
        }}
      >
        {icon}
      </div>
      <div className="sb-contact-details__item-copy">
        <h3 style={titleStyles}>{title}</h3>
        {href ? (
          <a href={href} style={{ ...contentStyles, display: "block", textDecorationColor: "rgba(41,71,61,0.42)", textUnderlineOffset: "0.24em" }}>
            {content}
          </a>
        ) : (
          <div style={contentStyles}>
            {content}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ContactDetails({ blok }: { blok: ContactDetailsBlok }) {
  const headlineSizeStyles = resolveHeadlineSize(blok.headline_size);
  const textSizeStyles = resolveTextSize(blok.text_size);

  return (
    <section {...storyblokEditable(blok)} className="w-full py-4">
      <div className="sb-contact-details">
        <div className="sb-contact-details__intro">
          {blok.headline ? (
            <h2
              className="font-display tracking-[-0.04em]"
              style={{
                color: "#35584d",
                fontSize: headlineSizeStyles.fontSize,
                lineHeight: headlineSizeStyles.lineHeight,
                fontWeight: blok.headline_bold ? 700 : 400,
              }}
            >
              {blok.headline}
            </h2>
          ) : null}

          <div
            className={blok.headline ? "mt-8 whitespace-pre-line" : "whitespace-pre-line"}
            style={{
              color: "rgba(41,71,61,0.82)",
              fontSize: textSizeStyles.fontSize,
              lineHeight: textSizeStyles.lineHeight,
            }}
          >
            {blok.text || "Pflegen Sie in Storyblok den Beschreibungstext für diesen Bereich."}
          </div>
        </div>

        <div className="sb-contact-details__list">
          <ContactItem
            icon={<PinIcon />}
            title="Adresse"
            content={blok.address || "Adresse in Storyblok eintragen"}
          />
          <ContactItem
            icon={<PhoneIcon />}
            title="Kontakt"
            content={blok.phone || "Telefonnummer in Storyblok eintragen"}
            href={blok.phone ? `tel:${blok.phone.replace(/\s+/g, "")}` : undefined}
          />
          <ContactItem
            icon={<MailIcon />}
            title="E-Mail"
            content={blok.email || "E-Mail-Adresse in Storyblok eintragen"}
            href={blok.email ? `mailto:${blok.email}` : undefined}
          />
        </div>
      </div>
    </section>
  );
}
