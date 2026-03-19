# `@dennisfoerster/storyblok-sections`

Wiederverwendbare Storyblok-Komponenten und Hilfsfunktionen fuer Next.js-Projekte.

Der Ordner ist jetzt so vorbereitet, dass du ihn mit wenig Aufwand in ein eigenes Git-Repo verschieben kannst.

## Enthalten

- `navigation`
- `footer`
- `hero`
- `feature_cards`
- `feature_card`
- globales Reveal-Animationssystem
- `registerStoryblokSections()` fuer die Storyblok-Registrierung
- Doku und Schema-Dateien fuer Storyblok

## Repo-Struktur

```txt
src/
  animation/
  components/
  lib/
docs/
schemas/
dist/
```

## Verwendung in einem anderen Next.js-Projekt

### 1. Package installieren

Als Workspace, lokales Paket oder aus einem eigenen Git-Repo:

```bash
npm install git+ssh://git@github.com/<dein-user>/storyblok-sections.git
```

### 2. Falls noetig: Package transpilen

Wenn das Package als Quellcode eingebunden wird:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@dennisfoerster/storyblok-sections"],
};

export default nextConfig;
```

### 3. Styles importieren

In deiner globalen CSS- oder Layout-Ebene:

```ts
import "@dennisfoerster/storyblok-sections/styles.css";
```

### 4. Storyblok registrieren

```ts
import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";
import { registerStoryblokSections } from "@dennisfoerster/storyblok-sections/register";

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  components: {
    ...registerStoryblokSections(),
  },
});
```

## Storyblok-Doku

- `docs/navigation.md`
- `docs/footer.md`
- `docs/hero.md`
- `docs/feature-cards.md`

## Storyblok-Schemas

Im Ordner `schemas/` liegen einfache Schema-Dateien als Referenz:

- `navigation.schema.json`
- `nav-item.schema.json`
- `footer.schema.json`
- `footer-link.schema.json`
- `hero.schema.json`
- `feature-cards.schema.json`
- `feature-card.schema.json`

## Lokale Entwicklung

```bash
npm install
npm run build
```

## In eigenes Repo verschieben

Empfohlener Ablauf:

1. Neues Git-Repo `storyblok-sections` anlegen.
2. Den kompletten Inhalt dieses Ordners in das neue Repo kopieren.
3. `private` in `package.json` je nach Ziel anpassen.
4. Optional Repository-Metadaten, Lizenz und CI ergaenzen.
5. In Zielprojekten per Git oder Registry installieren.

## Vor echtem Veröffentlichen noch sinnvoll

- `private` auf `false` setzen
- `repository`, `homepage` und `bugs` in `package.json` ergaenzen
- CI fuer Build/Checks ergaenzen
- Versionierung und Changelog festlegen
- optional `navigation`/`footer` visuell weiter entkoppeln
