import test from 'ava';
import commonTests from '../_commonTests';
import colorTests from '../_colorTests';
import sizeTests from '../_sizeTests';
import { runTests } from '../_utils';

const name = 'progress';
const mixinPath = '/elements/progress';

const progressContext = {
  name,
  mixinPath,
  types: [
    {
      type: 'generic',
      expectedTpl: '<progress class="progress">{{BLOCK}}</progress>',
    },
  ],
};

commonTests(progressContext);
colorTests(progressContext);
sizeTests(progressContext);

// DEFAULT IMPLEMENTATION
const progressCustomContext = {
  name,
  mixinPath,
  types: [
    {
      type: '0.4/1 implementation',
      mixinAttributes: {
        value: 0.4,
      },
      expectedTpl: '<progress class="progress" value="0.4">40%</progress>',
    },
    {
      type: '50/200 implementation',
      mixinAttributes: {
        value: 50,
        max: 200,
      },
      expectedTpl: '<progress class="progress" value="50" max="200">25%</progress>',
    },
    {
      type: '33/66 implementation',
      mixinAttributes: {
        value: 33,
        max: 66,
      },
      expectedTpl: '<progress class="progress" value="33" max="66">50%</progress>',
    },
  ],
};

runTests((descriptor, setup) => {
  test(descriptor, (t) => {
    const { actual, expected } = setup();
    t.is(actual.render(), expected.render());
  });
}, progressCustomContext);

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
}, progressContext);
