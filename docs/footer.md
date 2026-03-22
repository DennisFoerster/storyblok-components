# `footer` und `footer_link`

Globale Footer-Komponente fuer Storyblok-Setups mit `config/footer`.

## Content Types

- Root-Story: `footer`
- Child-Block: `footer_link`

## `footer` Felder

- `text`
  Typ: `Text` oder `Textarea`
- `container_width`
  Typ: `Single-Option`
  Werte: `wide`, `full`
- `links`
  Typ: `Blocks`
  Erlaubte Komponenten: `footer_link`

## `footer_link` Felder

- `label`
  Typ: `Text`
- `link`
  Typ: `Link`

## Empfehlung

Lege die Story als globale Konfiguration an:

- `config/footer`

`wide` nutzt die bisherige Inhaltsbreite. `full` zieht den Footer-Inhalt in voller Browserbreite auf.
