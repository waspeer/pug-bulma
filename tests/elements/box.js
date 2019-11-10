import commonTests from '../_commonTests';

const boxContext = {
  name: 'box',
  mixinPath: '/elements/box',
  types: [
    {
      type: 'generic',
      expectedTpl: '<div class="box">{{BLOCK}}</div>',
    },
  ],
};

commonTests(boxContext);
