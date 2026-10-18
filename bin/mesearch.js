#!/usr/bin/env node

process.argv.splice(2, 0, 'search');
require('./medesign.js');
