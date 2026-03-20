# `feature_cards` und `feature_card`

Grid-Komponente fuer 1 bis 4 Kacheln.

## Content Types

- Parent-Block: `feature_cards`
- Child-Block: `feature_card`

## `feature_cards` Felder

- `background_color`
  Typ: `Color Picker` oder Color-Plugin
- `items`
  Typ: `Blocks`
  Erlaubte Komponenten: `feature_card`

## `feature_card` Felder

- `headline`
  Typ: `Text`
- `text`
  Typ: `Textarea`
- `text_size`
  Typ: `Single-Option`
  Werte: `small`, `medium`, `large`
- `icon`
  Typ: `Asset`

## Verhalten

- maximal 4 Kacheln
- 1 bis 4 Elemente moeglich
- mobil gestapelt
- auf Desktop volle Breite innerhalb des Seitencontainers
- Kartenhoehe visuell angeglichen
