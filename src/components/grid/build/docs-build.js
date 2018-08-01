const docsBuild = require('../../../../build/component-docs-build');
const path = require('path');
const info = require('../package.json');

const RowPath = path.resolve(__dirname, '..', 'CdrRow.vue');
const ColPath = path.resolve(__dirname, '..', 'CdrCol.vue');

docsBuild(RowPath, info);
docsBuild(ColPath, info);