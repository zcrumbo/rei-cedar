const docsBuild = require('../../../../build/component-docs-build');
const path = require('path');
const info = require('../package.json');

const IconPath = path.resolve(__dirname, '..', 'CdrIcon.vue');

docsBuild(IconPath, info);
