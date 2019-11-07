import * as pugjs from "pug";
import { resolve } from "path";
import test from "ava";

/*
 * PUG TAGGED TEMPLATE FUNCTION
 */

export let renderPug = pugString =>
  pugjs.render(pugString, {
    basedir: resolve("./src/")
  });

function removeExtraTabs(string) {
  let lines = string.split("\n");
  const firstLineIndex = lines[0] === "" ? 1 : 0;
  const tabLength = lines[firstLineIndex].match(/^[\t\s]*/g)[0].length;
  return lines
    .map(line => (line.length < tabLength ? line : line.slice(tabLength)))
    .join("\n");
}

export let pug = (strings, ...vars) => {
  const pugString = strings.reduce(
    (pugString, string, i) => pugString + string + (vars[i] ? vars[i] : ""),
    ""
  );

  return renderPug(removeExtraTabs(pugString).trim());
};

/*
 * COMMON TESTS
 */

export function commonTests({ name, mixinPath, types }) {
  types.forEach(typeInfo => {
    let { type, mixinAttributes, expectedTpl } = typeInfo;
    const descriptor = (type === "" ? "" : type + " ") + name;
    const tmplPlaceholder = "{{BLOCK}}";
    mixinAttributes = mixinAttributes
      ? `&attributes(${JSON.stringify(mixinAttributes)})`
      : "";
    console.log(mixinAttributes);

    // TEST WITHOUT CONTENT
    test(`empty ${descriptor}`, t => {
      const actual = pug`
        include ${mixinPath}
        +${name}()()${mixinAttributes}
      `;
      const expected = expectedTpl.replace(tmplPlaceholder, "");
      t.is(actual, expected);
    });

    // TEST WITH CONTENT
    test(`${descriptor} with content`, t => {
      const actual = pug`
        include ${mixinPath}
        +${name}()()${mixinAttributes}
          h1 Hello World
          h2 Foo Bar
      `;
      const content = "<h1>Hello World</h1><h2>Foo Bar</h2>";
      const expected = expectedTpl.replace(tmplPlaceholder, content);
      t.is(actual, expected);
    });

    // TEST WITH CUSTOM CLASSNAMES
    test(`${descriptor} with custom classes`, t => {
      const customClasses = ["custom", "classNames"];
      const actual = pug`
        include ${mixinPath}
        +${name}()(class=${JSON.stringify(customClasses)})${mixinAttributes}
      `;
      const expected = expectedTpl
        .replace(/class="(.*)"/, (match, classList) => {
          classList = classList.split(" ");
          const newClassList = classList.concat(customClasses).join(" ");
          return `class="${newClassList}"`;
        })
        .replace(tmplPlaceholder, "");
      t.is(actual, expected);
    });
  });
}
