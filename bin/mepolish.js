#!/usr/bin/env node

process.argv.splice(2, 0, 'polish');
require('./medesign.js');
