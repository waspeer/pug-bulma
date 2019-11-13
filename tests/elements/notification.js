import commonTests from '../_commonTests';
import colorTests from '../_colorTests';

const name = 'notification';
const mixinPath = '/elements/notification';

const notificationContext = {
  name,
  mixinPath,
  types: [
    {
      type: 'generic',
      expectedTpl: '<div class="notification">{{BLOCK}}</div>',
    },
  ],
};

commonTests(notificationContext);
colorTests(notificationContext);
