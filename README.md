<div align="center">
    <img src="https://github.com/waspeer/pug-bulma/raw/master/pug-bulma.png" width="250" />
</div>
<h1 align="center">Pug-Bulma</h1>
<div align="center">
  <a href="https://www.codacy.com/manual/waspeer/pug-bulma?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=waspeer/pug-bulma&amp;utm_campaign=Badge_Grade">
    <img src="https://img.shields.io/codacy/grade/ff3d1a5b7d0342338ec318507e8a2079" />
  </a>
  <a href="http://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/github/license/waspeer/pug-bulma" />
  </a>
</div>
<div align="center">Bulma mixins for Pug</div>
<br />

**Currently in development**

Pug-Bulma has a super easy syntax that drastically decreases the amount of code needed to write static html by combining the forces of [Pug](https://pugjs.org) and [Bulma](https://bulma.io).

## Install
A boilerplate is on the roadmap, but for now you can just download the repository:
```bash
$ git clone https://github.com/waspeer/pug-bulma.git
```

## Usage
```pug
+button()
  Click Me!
// <button class="button">Click Me!</button>

+button()(type="a")
  No! Click Me!
// <a class="button">No! Click Me!</a>

+button()(primary)
  I am colorful
// <button class="button is-primary">I am colorful</button>
```

All modifiers are set as attributes. This keeps the intention clear, since attributes are named.

Right now this package is still developed. The documentation will be updated to contain more examples.

## License
MIT © Wannes Salomé
