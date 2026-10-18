#!/usr/bin/env node

process.argv.splice(2, 0, 'bolder');
require('./medesign.js');
