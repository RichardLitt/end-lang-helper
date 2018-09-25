#!/usr/bin/env node

// Run: node cli.js '* [Test](https://github.com/user/repo) test.'
const addStars = require('./index.js')
// const meow = require('meow')
// const cli = meow(`
//   Usage
//     $ end-lang-helper README.md
// `)

const fs = require('graceful-fs')
const readline = require('readline')

var rd = readline.createInterface({
  input: fs.createReadStream('README.md'),
  output: process.stdout,
  console: false
})

rd.on('line', (line) => addStars(line, {ignore: '<!-- ell:ignore -->'}))

// TODO Add a better helper
// if (cli.input.length === 0) {
//   console.error('Input file required')
//   process.exit(1)
// }
