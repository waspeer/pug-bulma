import commonTests from '../_commonTests';
import sizeTests from '../_sizeTests';

const name = 'delete';
const mixinPath = '/elements/delete';

const deleteContext = {
  name,
  mixinPath,
  types: [
    {
      type: 'generic',
      expectedTpl: '<div class="delete">{{BLOCK}}</div>',
    },
  ],
};

commonTests(deleteContext);
sizeTests(deleteContext);
