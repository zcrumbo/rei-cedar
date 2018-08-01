const docsBuild = require('../../../../build/component-docs-build');
const path = require('path');
const info = require('../package.json');

const QuotePath = path.resolve(__dirname, '..', 'CdrQuote.vue');

docsBuild(QuotePath, info);
