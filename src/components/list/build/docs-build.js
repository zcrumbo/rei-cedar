const docsBuild = require('../../../../build/component-docs-build');
const path = require('path');
const info = require('../package.json');

const ListPath = path.resolve(__dirname, '..', 'CdrList.vue');

docsBuild(ListPath, info);
