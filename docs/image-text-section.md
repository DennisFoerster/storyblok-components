# `image_text_section`

Zweispaltige Bild-Text-Komponente mit umschaltbarer Bildposition.

## Content Type

Block-Komponente: `image_text_section`

## Felder

- `image`
  Typ: `Asset`
- `image_right`
  Typ: `Boolean`
  Wenn aktiv, steht das Bild rechts
- `headline`
  Typ: `Text`
- `text`
  Typ: `Textarea`
- `headline_size`
  Typ: `Single-Option`
  Werte: `small`, `medium`, `large`
- `text_size`
  Typ: `Single-Option`
  Werte: `small`, `medium`, `large`
- `headline_align`
  Typ: `Single-Option`
  Werte: `left`, `center`, `right`
- `text_align`
  Typ: `Single-Option`
  Werte: `left`, `center`, `right`
- `container_width`
  Typ: `Single-Option`
  Werte: `wide`, `full`
- `text_background_color`
  Typ: `Color Picker` oder Color-Plugin
  Standard: `#ffffff`

## Verhalten

- Auf Desktop werden Bild und Text zweispaltig dargestellt
- Auf Mobile stapelt sich der Block untereinander
- Das Bild kann per Switch links oder rechts erscheinen
- Überschrift und Fließtext haben getrennte Größen- und Ausrichtungsoptionen
- Die Hintergrundfarbe des Textbereichs ist separat konfigurierbar
- `full` bricht den Block auf echte Browserbreite aus
