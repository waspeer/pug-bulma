# Pug-bulma

## Attributes
When you pass an attribute to a mixin it will be passed on 1 to 1 most of the time.

```pug
+box()(id="fooBar")
// <div class="box" id="fooBar"></div>
```

Some mixins accept attributes with a special meaning.

```pug
+icon()(iconType="i" iconClass="fas fa-info-circle")
// <span class="icon"><i class="fas fa-info-circle"></i></span>
```

These attributes are removed from the attribute object before compiling so they don't end up on the element as actual html attributes.
