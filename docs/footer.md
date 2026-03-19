# `footer` und `footer_link`

Globale Footer-Komponente fuer Storyblok-Setups mit `config/footer`.

## Content Types

- Root-Story: `footer`
- Child-Block: `footer_link`

## `footer` Felder

- `text`
  Typ: `Text` oder `Textarea`
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
