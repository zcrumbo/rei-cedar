const docsBuild = require('../../../../build/component-docs-build');
const path = require('path');
const info = require('../package.json');

const RadioPath = path.resolve(__dirname, '..', 'CdrRadio.vue');

docsBuild(RadioPath, info);
