const docsBuild = require('../../../../build/component-docs-build');
const path = require('path');
const info = require('../package.json');

const BreadcrumbPath = path.resolve(__dirname, '..', 'CdrBreadcrumb.vue');

docsBuild(BreadcrumbPath, info);
