# `hero`

Storyblok-Komponente fuer eine Hero-Sektion mit Bild, CTA und Reveal-Animation.

## Content Type

Block-Komponente: `hero`

## Felder

- `eyebrow`
  Typ: `Text`
- `headline`
  Typ: `Text`
- `text`
  Typ: `Textarea`
- `image`
  Typ: `Asset`
- `background_color`
  Typ: `Color Picker` oder Color-Plugin
- `accent_color`
  Typ: `Color Picker` oder Color-Plugin
- `headline_color`
  Typ: `Color Picker` oder Color-Plugin
- `text_color`
  Typ: `Color Picker` oder Color-Plugin
- `cta_label`
  Typ: `Text`
- `cta_link`
  Typ: `Link`
- `cta_background_color`
  Typ: `Color Picker` oder Color-Plugin
- `cta_text_color`
  Typ: `Color Picker` oder Color-Plugin
- `headline_size`
  Typ: `Single-Option`
  Werte: `small`, `medium`, `large`, `xl`
- `text_size`
  Typ: `Single-Option`
  Werte: `small`, `medium`, `large`
- `image_animation`
  Typ: `Single-Option`
  Werte: `none`, `fade`, `slide`, `zoom`, `blur`
- `image_animation_direction`
  Typ: `Single-Option`
  Werte: `up`, `down`, `left`, `right`, `center`
- `image_animation_speed`
  Typ: `Single-Option`
  Werte: `fast`, `medium`, `slow`, `extra-slow`
- `image_animation_delay`
  Typ: `Number`
  Beispiel: `120`
- `image_animation_distance`
  Typ: `Number`
  Beispiel: `56`

## Defaults

- Delay: `120`
- Distanz: `56`
- Trigger: `mount`

## Empfehlung

Fuer einen ruhigen Hero:

- Animation: `slide`
- Richtung: `left`
- Speed: `slow`
- Delay: `120`
- Distanz: `72`
