#!/usr/bin/env node

// const chalk = require('chalk')
const meow = require('meow')
const addStars = require('./')
const Promise = require('bluebird')

const cli = meow(`
  Usage
    $ add-stars README.md
`)

if (cli.input.length === 0) {
  console.error('Input file required')
  process.exit(1)
}

Promise.resolve(addStars(cli.input[0]))
.then(data => {
  console.log(data)
  // for (const x of data) {
  //   if (cli.flags.forks && !x.fork) {
  //     return;
  //   }
  //
  //   if (cli.flags.sources && x.fork) {
  //     return;
  //   }
  //
  //   if (!cli.flags.forks && !cli.flags.sources && x.fork) {
  //     x.name += chalk.dim(' (fork)');
  //   }
  //
  //   if (cli.flags.repos) {
  //     console.log(x.name);
  //     return;
  //   }
  //
  //   if (cli.flags.urls) {
  //     console.log(x.html_url);
  //     return;
  //   }
  //
  //   console.log(`${x.name} ${chalk.dim(x.html_url)}`);
  // }
})
