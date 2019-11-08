import { testWrapper } from "./_utils";
import test from "ava";

/*
 * COMMON TESTS
 */

// tests for
// - a simple render
// - a render with content
// - a render with added classes

const commonTests = testWrapper((descriptor, setup) => {
  // WITHOUT CONTENT
  test(`empty ${descriptor}`, t => {
    const { render } = setup();
    const { actual, expected } = render();
    t.is(actual, expected);
  });

  // WITH CONTENT
  test(`${descriptor} with content`, t => {
    const { setBlock, render } = setup();
    setBlock({
      pug: `
        h1 Hello World
        h2 Foo Bar
      `,
      html: "<h1>Hello World</h1><h2>Foo Bar</h2>"
    });
    const { actual, expected } = render();
    t.is(actual, expected);
  });

  // WITH CUSTOM CLASSNAMES
  test(`${descriptor} with custom classes`, t => {
    const { addClass, render } = setup();
    const customClasses = ["custom", "classNames"];
    addClass(...customClasses);
    const { actual, expected } = render();
    t.is(actual, expected);
  });
});

export default commonTests;
