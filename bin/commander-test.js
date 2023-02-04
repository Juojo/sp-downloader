#!/usr/bin/env node

const commander = require('commander');
const ver = require('../lib/ver');

commander
  .option('-v, --version', 'show version', ver, '')
  .option('-nc, --nocover', "it will not save the cover")
  .parse(process.argv);

console.log(commander.args[0]);

if (commander._optionValues.nocover === true) {
    console.log("nc");
}