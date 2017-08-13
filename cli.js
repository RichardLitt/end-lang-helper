#!/usr/bin/env node

// Run: node cli.js '* [Test](https://github.com/user/repo) test.'
const meow = require('meow')
const addStars = require('./index.js')
const Promise = require('bluebird')
const cli = meow(`
  Usage
    $ add-stars README.md
`)

var fs = require('fs'),
    readline = require('readline');

var rd = readline.createInterface({
    input: fs.createReadStream('README.md'),
    output: process.stdout,
    console: false
});

rd.on('line', function(line) {
  console.log(addStars(line, {ignore: '<!-- ell:ignore -->'}))
});

// if (cli.input.length === 0) {
//   console.error('Input file required')
//   process.exit(1)
// }
// 
// Promise.resolve(addStars(cli.input[0], {ignore: '<!-- ell:ignore -->'}))
// .then(data => {
//   console.log(data)
// })
