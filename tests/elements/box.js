import commonTests from '../_commonTests';

commonTests({
  name: 'box',
  mixinPath: '/elements/box',
  types: [
    {
      type: 'generic',
      expectedTpl: '<div class="box">{{BLOCK}}</div>',
    },
  ],
});
