# Image

[📖 Bulma Docs](https://bulma.io/documentation/elements/image/)

```pug
+image()(
  src=""
  rounded
)
```

This mixin renders a `<figure/>` element with class `image`. This is a wrapper for an actual image or any [other element with a ratio](https://bulma.io/documentation/elements/image/#arbitrary-ratios-with-any-element). Since it will be most commonly used for `<img/>` elements Pug-Bulma allows you to automatically render it as a child. This happens when the `src` attribute is set.

```pug
+image
// <figure class="image"></figure>

+image()(16by16 src="/images/inspector-meow.jpg")
// <figure class="image is-16by16"><img src="/images/inspector-meow.jpg"</figure>

+image()(rounded src="/images/inspector-meow.jpg")
// <figure class="image"><img class="is-rounded" src="/images/inspector-meow.jpg"</figure>
```

The `rounded` attribute add the `is-rounded` class to the child `<img/>` element.

## Modifiers
```
fullwidth: 'is-fullwidth',

// SQUARE FIXED
'16by16': 'is-16by16',
'24by24': 'is-24by24',
'32by32': 'is-32by32',
'48by48': 'is-48by48',
'96by96': 'is-96by96',
'128by128': 'is-128by128',

// RESPONSIVE
square: 'is-square',
'1by1': 'is-1by1',
'5by4': 'is-4by4',
'4by3': 'is-4by3',
'3by2': 'is-3by2',
'5by3': 'is-5by3',
'16by9': 'is-16by9',
'2by1': 'is-2by1',
'3by1': 'is-3by1',
'4by5': 'is-4by5',
'3by4': 'is-3by4',
'2by3': 'is-2by3',
'3by5': 'is-3by5',
'9by16': 'is-9by16',
'1by2': 'is-1by2',
'1by3': 'is-1by3',
```
