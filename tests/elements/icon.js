import test from 'ava';
import commonTests from '../_commonTests';
import sizeTests from '../_sizeTests';
import { createTestWrapper } from '../_utils';

const name = 'icon';
const mixinPath = '/elements/icon';

const genericIconContext = {
  name,
  mixinPath,
  types: [
    {
      type: 'generic',
      expectedTpl: '<span class="icon">{{BLOCK}}</span>',
    },
  ],
};

commonTests(genericIconContext);
sizeTests(genericIconContext);

// ICON IMPLEMENTATIONS
const implIconContext = {
  name,
  mixinPath,
  types: [
    {
      type: 'default implementation',
      expectedTpl: '<span class="icon"><i class="fas fa-info-circle"></i></span>',
      mixinAttributes: {
        iconClass: 'fas fa-info-circle',
      },
    },
    {
      type: 'span implementation',
      expectedTpl: '<span class="icon"><span class="fas fa-info-circle"></span></span>',
      mixinAttributes: {
        iconClass: 'fas fa-info-circle',
        iconType: 'span',
      },
    },
  ],
};

createTestWrapper((descriptor, setup) => {
  test(descriptor, (t) => {
    const { actual, expected } = setup();
    actual.setAttribute('iconClass', 'fas fa-info-circle');
    t.is(actual.render(), expected.render());
  });

  test(`${descriptor} with block override`, (t) => {
    const { actual, expected } = setup();
    actual.setAttribute('iconClass', 'fas fa-info-circle');
    actual.setBlock('<p>I am important</p>');
    t.not(
      actual.render(),
      expected.render(),
      'Block content should override default icon implementations',
    );
  });
})(implIconContext);
