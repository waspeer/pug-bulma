const { src, dest } = require('gulp');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const { argv } = require('yargs');

function createNewFilesFromTemplate() {
  const mixinInfo = argv.mixin.split('/');
  const mixinFolder = mixinInfo[0];
  const mixinName = mixinInfo[1];
  return src(['docs/_TEMPLATE.md', 'src/_TEMPLATE.pug', 'tests/_TEMPLATE.js'])
    .pipe(rename({
      dirname: mixinFolder,
      basename: mixinName,
    }))
    .pipe(replace('ELEMENT', mixinName))
    .pipe(dest((file) => file.base));
}

exports.create = createNewFilesFromTemplate;
