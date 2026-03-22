# `contact_details`

Zweispaltige Kontakt-Komponente mit frei pflegbarem Einleitungstext links und drei festen Kontaktblöcken rechts.

## Content Type

Block-Komponente: `contact_details`

## Felder

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
- `headline_bold`
  Typ: `Boolean`
- `address`
  Typ: `Textarea`
- `phone`
  Typ: `Text`
- `email`
  Typ: `Text`

## Verhalten

- Linke Spalte: Überschrift und Beschreibung
- Rechte Spalte: immer genau `Adresse`, `Kontakt` und `E-Mail`
- Icons und Zwischenüberschriften rechts sind fest im Component hinterlegt
- Telefonnummer und E-Mail werden automatisch klickbar gerendert
