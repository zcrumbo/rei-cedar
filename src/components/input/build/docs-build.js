const docsBuild = require('../../../../build/component-docs-build');
const path = require('path');
const info = require('../package.json');

const InputPath = path.resolve(__dirname, '..', 'CdrInput.vue');

docsBuild(InputPath, info);
