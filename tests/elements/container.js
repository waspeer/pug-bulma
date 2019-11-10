import commonTests from '../_commonTests';

commonTests({
  name: 'container',
  mixinPath: '/elements/container',
  types: [
    {
      type: 'generic',
      expectedTpl: '<div class="container">{{BLOCK}}</div>',
    },
    {
      type: 'fluid',
      mixinAttributes: { fluid: true },
      expectedTpl: '<div class="container is-fluid">{{BLOCK}}</div>',
    },
  ],
});
