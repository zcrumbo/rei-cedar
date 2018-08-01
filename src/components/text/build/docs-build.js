const docsBuild = require('../../../../build/component-docs-build');
const path = require('path');
const info = require('../package.json');

const TextPath = path.resolve(__dirname, '..', 'CdrText.vue');

docsBuild(TextPath, info);
