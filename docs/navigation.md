# `navigation` und `nav_item`

Globale Header-Komponente fuer Storyblok-Setups mit `config/navigation`.

## Content Types

- Root-Story: `navigation`
- Child-Block: `nav_item`

## `navigation` Felder

- `logo`
  Typ: `Asset`
- `logo_label`
  Typ: `Text`
- `logo_link`
  Typ: `Link`
- `logo_width`
  Typ: `Number`
- `container_width`
  Typ: `Single-Option`
  Werte: `wide`, `full`
- `items`
  Typ: `Blocks`
  Erlaubte Komponenten: `nav_item`
- `cta_label`
  Typ: `Text`
- `cta_link`
  Typ: `Link`

## `nav_item` Felder

- `label`
  Typ: `Text`
- `link`
  Typ: `Link`

## Empfehlung

Lege die Story als globale Konfiguration an:

- `config/navigation`

Dann kannst du sie projektweit im Layout laden.

`wide` nutzt die bisherige Inhaltsbreite. `full` zieht die Navigation in voller Browserbreite auf.
