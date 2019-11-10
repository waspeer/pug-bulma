import commonTests from '../_commonTests';
import modifierTests from '../_modifierTests';

const containerContext = {
  name: 'container',
  mixinPath: '/elements/container',
  types: [
    {
      type: 'generic',
      expectedTpl: '<div class="container">{{BLOCK}}</div>',
    },
  ],
};

const containerModifierMap = {
  fluid: 'is-fluid',
};

commonTests(containerContext);
modifierTests(containerContext, containerModifierMap);
