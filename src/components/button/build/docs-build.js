const docsBuild = require('../../../../build/component-docs-build');
const path = require('path');
const info = require('../package.json');

const ButtonPath = path.resolve(__dirname, '..', 'CdrButton.vue');

docsBuild(ButtonPath, info);
