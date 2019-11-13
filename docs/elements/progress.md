# Progress

[📖 Bulma Docs](https://bulma.io/documentation/elements/progress/)

```pug
+progress
```

When the `value` attribute is set Pug-Bulma by default renders the percentage as the innerHTML of the tag. This is based on the `value` and `max` attributes.

```pug
+progress()(value=0.4)
// <progress class="progress" value="0.4">40%</progress>
```

When no `max` attribute is set a max of 1 is assumed.

## Modifiers

**Shared modifiers**  
This element supports [colors](../modifiers.md#colors) and [sizes](../modifiers.md#sizes).
