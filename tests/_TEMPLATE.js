import test from 'ava';
import commonTests from '../_commonTests';
import colorTests from '../_colorTests';
import sizeTests from '../_sizeTests';
import modifierTests from '../_modifierTests';
import { runTests } from '../_utils';

const name = 'ELEMENT';
const mixinPath = '/elements/ELEMENT';

const ELEMENTContext = {
  name,
  mixinPath,
  types: [
    {
      type: 'generic',
      expectedTpl: '<div class="ELEMENT">{{BLOCK}}</div>',
    },
  ],
};

const ELEMENTModifierMap = {};

commonTests(ELEMENTContext);
// colorTests(ELEMENTContext);
// sizeTests(ELEMENTContext);
modifierTests(ELEMENTContext, ELEMENTModifierMap);

// CUSTOM TESTS
const ELEMENTCustomContext = {
  name,
  mixinPath,
  types: [
    {
      type: 'custom',
      expectedTpl: '<div class="ELEMENT">{{BLOCK}}</div>',
    },
  ],
};

runTests((descriptor, setup) => {
  test(descriptor, (t) => {
    const { actual, expected } = setup();
    t.is(actual.render(), expected.render());
  });
}, ELEMENTCustomContext);
