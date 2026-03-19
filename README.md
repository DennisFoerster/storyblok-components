# `@dennisfoerster/storyblok-sections`

Wiederverwendbare Storyblok-Komponenten und Hilfsfunktionen für Next.js-Projekte.

GitHub-Repository:

- `https://github.com/DennisFoerster/storyblok-components`

## Enthalten

- `navigation`
- `footer`
- `hero`
- `feature_cards`
- `feature_card`
- globales Reveal-Animationssystem
- `registerStoryblokSections()` für die Storyblok-Registrierung
- Doku und Schema-Referenzen für Storyblok

## Installation im Projekt

```bash
npm install git+https://github.com/DennisFoerster/storyblok-components.git
```

Das Paket enthält ein `prepare`-Script und baut sich bei Git-Installation selbst.

## Verwendung in einem Next.js-Projekt

### 1. Styles importieren

Zum Beispiel in `app/layout.tsx`:

```ts
import "@dennisfoerster/storyblok-sections/styles.css";
```

### 2. Storyblok-Komponenten registrieren

Zum Beispiel in `lib/storyblok.ts`:

```ts
import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";
import { registerStoryblokSections } from "@dennisfoerster/storyblok-sections/register";

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  components: {
    ...registerStoryblokSections(),
    page: Page,
    text_section: TextSection,
  },
});
```

### 3. Falls nötig: Next-Konfiguration prüfen

In vielen Fällen reicht die Git-Abhängigkeit direkt. Wenn ein Projekt Paketquellcode transpilen muss, kann zusätzlich `transpilePackages` nötig sein:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@dennisfoerster/storyblok-sections"],
};

export default nextConfig;
```

## Aktueller Standard-Ablauf

1. Paket im Projekt installieren
2. globale Paket-Styles importieren
3. Storyblok über `registerStoryblokSections()` registrieren
4. in Storyblok die passenden Content Types / Blöcke anlegen
5. Inhalte in Stories befüllen

## Storyblok-Doku

- `docs/navigation.md`
- `docs/footer.md`
- `docs/hero.md`
- `docs/feature-cards.md`

## Storyblok-Schema-Referenzen

Im Ordner `schemas/` liegen Referenzdateien für die anzulegenden Komponenten:

- `navigation.schema.json`
- `nav-item.schema.json`
- `footer.schema.json`
- `footer-link.schema.json`
- `hero.schema.json`
- `feature-cards.schema.json`
- `feature-card.schema.json`

## Lokale Entwicklung des Pakets

```bash
npm install
npm run build
```

## Typischer Workflow bei Änderungen

1. Änderungen im Komponenten-Repo machen
2. ins Repo `storyblok-components` committen und pushen
3. im Zielprojekt `npm install` erneut ausführen, damit der neue Git-Stand gezogen wird

## Hinweis

Die Komponenten nutzen Tailwind-Utilities im konsumierenden Next.js-Projekt. Das Paket ist daher für Projekte gedacht, die bereits mit Tailwind arbeiten.
