import commonTests from '../_commonTests';
import sizeTests from '../_sizeTests';

const contentContext = {
  name: 'content',
  mixinPath: '/elements/content',
  types: [
    {
      type: 'generic',
      expectedTpl: '<div class="content">{{BLOCK}}</div>',
    },
  ],
};

commonTests(contentContext);
sizeTests(contentContext);
