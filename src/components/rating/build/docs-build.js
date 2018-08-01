const docsBuild = require('../../../../build/component-docs-build');
const path = require('path');
const info = require('../package.json');

const RatingPath = path.resolve(__dirname, '..', 'CdrRating.vue');

docsBuild(RatingPath, info);
