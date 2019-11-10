import test from 'ava';
import { createTestWrapper } from './_utils';

const modifierTests = (testContext, modifierMap) => {
  createTestWrapper((descriptor, setup) => {
    Object.keys(modifierMap).forEach((modifier) => {
      test(`${modifier} ${descriptor}`, (t) => {
        const { actual, expected } = setup();
        actual.setAttribute(modifier, true);
        expected.addClass(modifierMap[modifier]);
        t.is(actual.render(), expected.render());
      });
    });
  })(testContext);
};

export default modifierTests;
