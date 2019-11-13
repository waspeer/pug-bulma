import test from 'ava';
import commonTests from '../_commonTests';
import modifierTests from '../_modifierTests';
import { runTests } from '../_utils';

const name = 'image';
const mixinPath = '/elements/image';

const imageContext = {
  name,
  mixinPath,
  types: [
    {
      type: 'generic',
      expectedTpl: '<figure class="image">{{BLOCK}}</figure>',
    },
  ],
};

const imageModifierMap = {
  fullwidth: 'is-fullwidth',

  // SQUARE FIXED
  '16by16': 'is-16by16',
  '24by24': 'is-24by24',
  '32by32': 'is-32by32',
  '48by48': 'is-48by48',
  '96by96': 'is-96by96',
  '128by128': 'is-128by128',

  // RESPONSIVE
  square: 'is-square',
  '1by1': 'is-1by1',
  '5by4': 'is-4by4',
  '4by3': 'is-4by3',
  '3by2': 'is-3by2',
  '5by3': 'is-5by3',
  '16by9': 'is-16by9',
  '2by1': 'is-2by1',
  '3by1': 'is-3by1',
  '4by5': 'is-4by5',
  '3by4': 'is-3by4',
  '2by3': 'is-2by3',
  '3by5': 'is-3by5',
  '9by16': 'is-9by16',
  '1by2': 'is-1by2',
  '1by3': 'is-1by3',
};

commonTests(imageContext);
modifierTests(imageContext, imageModifierMap);

// DEFAULT IMAGE IMPLEMENTATION
const implImageContext = {
  name,
  mixinPath,
  types: [
    {
      type: 'default implementation',
      mixinAttributes: {
        src: '/images/image.jpg',
      },
      expectedTpl: '<figure class="image"><img src="/images/image.jpg"/></figure>',
    },
    {
      type: 'rounded default implementation',
      mixinAttributes: {
        src: '/images/image.jpg',
        rounded: true,
      },
      expectedTpl: '<figure class="image"><img class="is-rounded" src="/images/image.jpg"/></figure>',
    },
  ],
};

runTests((descriptor, setup) => {
  test(descriptor, (t) => {
    const { actual, expected } = setup();
    t.is(actual.render(), expected.render());
  });
}, implImageContext);

// BLOCK OVERRIDES DEFAULT IMPLEMENTATION
runTests((descriptor, setup) => {
  test(`${name}: block overrides default implementation`, (t) => {
    const { setAttribute, setBlock, render } = setup();
    setAttribute('value', 0.2);
    setBlock({
      pug: 'span i am important',
      html: '<span>i am important</span>',
    });
    const { actual, expected } = render();
    t.is(actual, expected);
  });
}, imageContext);
