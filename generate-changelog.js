#!/usr/bin/env/ node

const chalk = require('chalk');
const _ = require('lodash');
const lerna = require('lerna');

console.log(chalk.green(`hello from generate-changelog`));
console.log(chalk.green('lerna changed', lerna.changed()));
process.exit();