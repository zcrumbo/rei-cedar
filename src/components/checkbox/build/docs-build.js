const docsBuild = require('../../../../build/component-docs-build');
const path = require('path');
const info = require('../package.json');

const CheckboxPath = path.resolve(__dirname, '..', 'CdrCheckbox.vue');

docsBuild(CheckboxPath, info);
