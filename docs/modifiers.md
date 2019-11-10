# Modifiers

Modifiers can be set as attributes.

```pug
+content()(large)
// <div class="content is-large"></div>
```

Modifiers in Pug-Bulma essentially are attribute to classname maps. Elements may support element-specific modifiers and may support shared modifiers.

## Shared modifiers
### Colors
```
white: "is-white",
black: "is-black",
light: "is-light",
dark: "is-dark",
primary: "is-primary",
link: "is-link",
info: "is-info",
success: "is-success",
warning: "is-warning",
danger: "is-danger",
text: "is-text"
```

### Sizes
```
small: "is-small",
normal: "is-normal",
medium: "is-medium",
large: "is-large"
```
