const docsBuild = require('../../../../build/component-docs-build');
const path = require('path');
const info = require('../package.json');

const ImagePath = path.resolve(__dirname, '..', 'CdrImg.vue');

docsBuild(ImagePath, info);
