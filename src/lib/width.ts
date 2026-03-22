export type StoryblokSingleOptionField =
  | string
  | { value?: string; label?: string; name?: string }
  | undefined;

export function resolveSingleOption(value: StoryblokSingleOptionField, fallback: string) {
  if (!value) {
    return fallback;
  }

  if (typeof value === "string") {
    return value;
  }

  return value.value || value.label || value.name || fallback;
}

export function resolveWidthMode(value: StoryblokSingleOptionField, fallback = "wide") {
  const mode = resolveSingleOption(value, fallback).trim().toLowerCase();

  if (
    mode === "full" ||
    mode === "voll" ||
    mode === "full_width" ||
    mode === "volle breite" ||
    mode === "ganze breite"
  ) {
    return "full";
  }

  return "wide";
}
