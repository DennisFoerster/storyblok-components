export type StoryblokSingleOptionField = string | { value?: string } | undefined;

export type AnimationType = "none" | "fade" | "slide" | "zoom" | "blur";
export type AnimationDirection = "up" | "down" | "left" | "right" | "center";
export type AnimationSpeed = "extra-slow" | "slow" | "medium" | "fast";

export function resolveSingleOption(
  value: StoryblokSingleOptionField,
  fallback: string,
) {
  if (!value) {
    return fallback;
  }

  if (typeof value === "string") {
    return value;
  }

  return value.value || fallback;
}

function normalizeOption(value: string) {
  return value.trim().toLowerCase().replaceAll("_", "-").replaceAll(/\s+/g, "-");
}

export function resolveAnimationType(value: StoryblokSingleOptionField): AnimationType {
  const resolved = normalizeOption(resolveSingleOption(value, "none"));

  if (resolved === "fade" || resolved === "fade-in" || resolved === "einblenden") {
    return "fade";
  }

  if (resolved === "slide" || resolved === "slide-in" || resolved === "move-in") {
    return "slide";
  }

  if (resolved === "zoom" || resolved === "zoom-in") {
    return "zoom";
  }

  if (resolved === "blur" || resolved === "blur-in" || resolved === "unscharf") {
    return "blur";
  }

  return "none";
}

export function resolveAnimationDirection(
  value: StoryblokSingleOptionField,
): AnimationDirection {
  const resolved = normalizeOption(resolveSingleOption(value, "up"));

  if (resolved === "up" || resolved === "top" || resolved === "oben") {
    return "up";
  }

  if (resolved === "down" || resolved === "bottom" || resolved === "unten") {
    return "down";
  }

  if (resolved === "left" || resolved === "links") {
    return "left";
  }

  if (resolved === "right" || resolved === "rechts") {
    return "right";
  }

  if (resolved === "center" || resolved === "middle" || resolved === "mitte") {
    return "center";
  }

  return "up";
}

export function resolveAnimationSpeed(value: StoryblokSingleOptionField): AnimationSpeed {
  const resolved = normalizeOption(resolveSingleOption(value, "medium"));

  if (
    resolved === "extra-slow" ||
    resolved === "extra-slowly" ||
    resolved === "sehr-langsam" ||
    resolved === "extra-langsam"
  ) {
    return "extra-slow";
  }

  if (resolved === "slow" || resolved === "langsam") {
    return "slow";
  }

  if (resolved === "fast" || resolved === "schnell") {
    return "fast";
  }

  if (resolved === "medium" || resolved === "normal" || resolved === "mittel") {
    return "medium";
  }

  return "medium";
}

export function resolveAnimationDelayMs(value: string | number | undefined, fallback = 120) {
  if (typeof value === "number" && Number.isFinite(value) && value >= 0) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value.trim().replace("ms", ""));
    if (Number.isFinite(parsed) && parsed >= 0) {
      return parsed;
    }
  }

  return fallback;
}

export function resolveAnimationDistance(value: string | number | undefined, fallback = 56) {
  if (typeof value === "number" && Number.isFinite(value) && value >= 0) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value.trim().replace("px", ""));
    if (Number.isFinite(parsed) && parsed >= 0) {
      return parsed;
    }
  }

  return fallback;
}
