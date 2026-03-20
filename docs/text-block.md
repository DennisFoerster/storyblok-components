# `text_block`

Einfache Text-Komponente mit optionaler Überschrift und frei konfigurierbarem Fließtext.

## Content Type

Block-Komponente: `text_block`

## Felder

- `headline`
  Typ: `Text`
  Optional
- `headline_color`
  Typ: `Color Picker` oder Color-Plugin
- `headline_size`
  Typ: `Single-Option`
  Werte: `small`, `medium`, `large`, `xl`
- `headline_bold`
  Typ: `Boolean`
- `headline_align`
  Typ: `Single-Option`
  Werte: `left`, `center`, `right`
- `text`
  Typ: `Textarea`
  Pflicht
- `text_color`
  Typ: `Color Picker` oder Color-Plugin
- `text_size`
  Typ: `Single-Option`
  Werte: `small`, `medium`, `large`
- `text_align`
  Typ: `Single-Option`
  Werte: `left`, `center`, `right`
- `container_width`
  Typ: `Single-Option`
  Werte: `narrow`, `medium`, `wide`, `full`
- `surface_style`
  Typ: `Single-Option`
  Werte: `plain`, `soft`, `panel`, `line`
- `background_color`
  Typ: `Color Picker` oder Color-Plugin
- `padding_size`
  Typ: `Single-Option`
  Werte: `none`, `small`, `medium`, `large`

## Hinweis

Die Komponente bleibt bewusst rein textbasiert, bietet aber mehr gestalterische Freiheit:

- Überschrift bleibt optional und wird bei leerem Feld komplett ausgelassen
- Breite des Textblocks ist steuerbar
- Oberfläche kann neutral, weich, kartenartig oder mit feiner Linie gestaltet werden
- Innenabstände und Hintergrundfarbe sind optional steuerbar

## Globale Textskala

Die Textgrößen des Fließtextes hängen an globalen CSS-Variablen und können projektweit überschrieben werden:

- `--sb-text-block-small-size`
- `--sb-text-block-small-line-height`
- `--sb-text-block-medium-size`
- `--sb-text-block-medium-line-height`
- `--sb-text-block-large-size`
- `--sb-text-block-large-line-height`

Dadurch eignet sie sich gut für Einleitungen, Zwischentexte, hervorgehobene Praxistexte oder ruhig gestaltete Content-Bereiche ohne Bild- oder Kartenlogik.
