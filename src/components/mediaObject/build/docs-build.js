const docsBuild = require('../../../../build/component-docs-build');
const path = require('path');
const info = require('../package.json');

const MediaObjectPath = path.resolve(__dirname, '..', 'CdrMediaObject.vue');

docsBuild(MediaObjectPath, info);
