const docsBuild = require('../../../../build/component-docs-build');
const path = require('path');
const info = require('../package.json');

const CardPath = path.resolve(__dirname, '..', 'CdrCard.vue');

docsBuild(CardPath, info);
