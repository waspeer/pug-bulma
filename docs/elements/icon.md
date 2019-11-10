# Icon

[📖 Bulma Docs](https://bulma.io/documentation/elements/icon/)

```pug
+icon()(
  iconType="i"
  iconClass=""
)
```

| Option      | Default |
| ----------- | ------- |
| _iconType_  | `i`     |
| _iconClass_ |         |

As the icon element in Bulma is just a container, Pug-Bulma allows specifying a type and class for automatically adding an icon to it. An icon can also be implemented in the usual way.

```pug
+icon()(iconClass="fas fa-info-circle")

// is the same as

+icon
  i.fas.fa-info-circle
```

Content added in the latter way will always override automatically added content.
