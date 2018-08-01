const docsBuild = require('../../../../build/component-docs-build');
const path = require('path');
const pkgInfo = require('../package.json');

const LinkPath = path.resolve(__dirname, '..', 'CdrLink.vue');

docsBuild(LinkPath, pkgInfo);
