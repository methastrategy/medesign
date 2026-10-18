#!/usr/bin/env node

process.argv.splice(2, 0, 'quiet');
require('./medesign.js');
