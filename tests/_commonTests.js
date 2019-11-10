import test from 'ava';
import { createTestWrapper } from './_utils';

/*
 * COMMON TESTS
 */

// tests for
// - a simple render without any classes or content
// - a render with content
// - a render with added classes

const commonTests = createTestWrapper((descriptor, setup) => {
  // WITHOUT CONTENT
  test(`empty ${descriptor}`, (t) => {
    const { render } = setup();
    const { actual, expected } = render();
    t.is(actual, expected);
  });

  // WITH CONTENT
  test(`${descriptor} with content`, (t) => {
    const { actual, expected } = setup();
    actual.setBlock(`
      h1 Hello World
      h2 Foo Bar
    `);
    expected.setBlock('<h1>Hello World</h1><h2>Foo Bar</h2>');
    t.is(actual.render(), expected.render());
  });

  // WITH CUSTOM CLASSNAMES
  test(`${descriptor} with custom classes`, (t) => {
    const { addClass, render } = setup();
    const customClasses = ['custom', 'classNames'];
    addClass(...customClasses);
    const { actual, expected } = render();
    t.is(actual, expected);
  });
});

export default commonTests;
