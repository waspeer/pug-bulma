import test from 'ava';
import { createTestWrapper } from './_utils';

const sizeMap = {
  small: 'is-small',
  normal: 'is-normal',
  medium: 'is-medium',
  large: 'is-large',
};

const sizeTests = createTestWrapper((descriptor, setup) => {
  // INDIVIDUAL SIZES
  test(`individual sizes on ${descriptor}`, (t) => {
    Object.keys(sizeMap).forEach((size) => {
      const { actual, expected } = setup();
      actual.setAttribute(size, true);
      expected.addClass(sizeMap[size]);
      t.is(actual.render(), expected.render(), `size '${size}' on ${descriptor}`);
    });
  });
});

export default sizeTests;
