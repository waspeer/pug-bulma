import test from 'ava';
import commonTests from '../_commonTests';
import colorTests from '../_colorTests';
import sizeTests from '../_sizeTests';
import modifierTests from '../_modifierTests';
import { runTests } from '../_utils';

const buttonContext = {
  name: 'button',
  mixinPath: '/elements/button',
  types: [
    {
      type: '<button> type',
      expectedTpl: '<button class="button">{{BLOCK}}</button>',
    },
    {
      type: '<a> type',
      mixinAttributes: {
        type: 'a',
      },
      expectedTpl: '<a class="button">{{BLOCK}}</a>',
    },
    {
      type: '<input type=submit> type',
      mixinAttributes: {
        type: 'submit',
      },
      expectedTpl: '<input class="button" type="submit"/>',
    },
    {
      type: '<input type=reset> type',
      mixinAttributes: {
        type: 'reset',
      },
      expectedTpl: '<input class="button" type="reset"/>',
    },
  ],
};

const buttonModifierMap = {
  // DISPLAYS
  fullwidth: 'is-fullwidth',

  // STYLES
  outlined: 'is-outlined',
  inverted: 'is-inverted',
  rounded: 'is-rounded',

  // STATES
  hovered: 'is-hovered',
  focused: 'is-focused',
  active: 'is-active',
  loading: 'is-loading',
  static: 'is-static',

  // GROUPING
  selected: 'is-selected',
};

commonTests(buttonContext);
colorTests(buttonContext);
sizeTests(buttonContext);
modifierTests(buttonContext, buttonModifierMap);

// test for disabled state seperately
runTests((descriptor, setup) => {
  test(`disabled ${descriptor}`, (t) => {
    const { setAttribute, render } = setup();
    setAttribute('disabled', true);
    const { actual, expected } = render();
    t.is(actual, expected);
  });
}, buttonContext);
