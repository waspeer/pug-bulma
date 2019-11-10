# Button

[📖 Bulma Docs](https://bulma.io/documentation/elements/button/)

```pug
+button()(
  type="button"
)
```

| Option | Default  | Accepts                    |
| ------ | -------- | -------------------------- |
| _type_ | `button` | `button\|a\|submit\|reset` |

A button can only be rendered as four different types:
-   `<button/>` element
-   `<a/>` element
-   `<input type="submit"/>`
-   `<input type="reset"/>`

## Modifiers
**Specific modifiers**
```
// DISPLAYS
fullwidth: "is-fullwidth",

// STYLES
outlined: "is-outlined",
inverted: "is-inverted",
rounded: "is-rounded",

// STATES
hovered: "is-hovered",
focused: "is-focused",
active: "is-active",
loading: "is-loading",
static: "is-static",

// GROUPING
selected: "is-selected"
```

**Shared modifiers**  
The button element supports [colors](../modifiers.md#colors) and [sizes](../modifiers.md#sizes).
