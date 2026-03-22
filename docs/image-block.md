# `image_block`

Schlichte Bild-Komponente mit frei steuerbarer Breite in Prozent und robuster Ausrichtung.

## Content Type

Block-Komponente: `image_block`

## Felder

- `image`
  Typ: `Asset`
- `width_percent`
  Typ: `Number`
  Beispiel: `100`, `80`, `60`
- `align`
  Typ: `Single-Option`
  Werte: `left`, `center`, `right`
- `container_width`
  Typ: `Single-Option`
  Werte: `wide`, `full`

## Verhalten

- Die Breite wird in Prozent der verfügbaren Containerbreite gesetzt
- `left`, `center` und `right` werden über Inline-Styles ausgerichtet
- Ohne Eingabe bei `width_percent` wird das Bild auf `100%` Breite dargestellt
- `wide` nutzt die normale Seitenbreite, `full` bricht auf echte Browserbreite aus
