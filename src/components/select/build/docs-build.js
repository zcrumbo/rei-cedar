const docsBuild = require('../../../../build/component-docs-build');
const path = require('path');
const info = require('../package.json');

const SelectPath = path.resolve(__dirname, '..', 'CdrSelect.vue');

docsBuild(SelectPath, info);
