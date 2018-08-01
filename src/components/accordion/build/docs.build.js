const docsBuild = require('../../../../build/component-docs-build');
const path = require('path');
const info = require('../package.json');

const AccordionPath = path.resolve(__dirname, '..', 'CdrAccordion.vue');
const AccordionItemPath = path.resolve(__dirname, '..', 'CdrAccordionItem.vue');

docsBuild(AccordionPath, info);
docsBuild(AccordionItemPath, info);
