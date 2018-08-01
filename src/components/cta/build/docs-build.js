const docsBuild = require('../../../../build/component-docs-build');
const path = require('path');
const info = require('../package.json');

const CtaPath = path.resolve(__dirname, '..', 'CdrCta.vue');

docsBuild(CtaPath, info);
