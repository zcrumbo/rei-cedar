const docsBuild = require('../../../../build/component-docs-build');
const path = require('path');
const info = require('../package.json');

const TablePath = path.resolve(__dirname, '..', 'CdrTable.vue');

docsBuild(TablePath, info);
