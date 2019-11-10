import test from 'ava';
import { testWrapper } from './_utils';

const modifierTests = (testContext, modifierMap) => {
  testWrapper((descriptor, setup) => {
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
