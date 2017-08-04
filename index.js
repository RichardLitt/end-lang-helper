// const fs = require('graceful-fs')
// const rl = require('readline')
// const file = '../README.md' // process.argv[2]
// const lineReader = rl.createInterface({
//   input: fs.createReadStream(file)
// })
// var output = ''

function addStars (input) {
  return 1
  // lineReader.on('line', function (line) {
  //   // Program logic
  //
  //   // TODO Make sure that description matches `...) - desc`. format
  //   // TODO Add periods on ends of descriptions
  //   // TODO Automatically get descriptions (requires major refactor)
  //
  //   // TODO Use a RegExp in JS, or use a Markdown parsing engine?
  //   // if it starts with a bullet followed by a "github.com" link
  //   // sed  s/^\* \[\(.*\)\](https:\/\/github.com\/\([^ )]*\))\(.*\)/* [\1 \![GitHub stars]\(https:\/\/img.shields.io\/github\/stars\/\2.svg\)]\(https:\/\/github.com\/\2\)\3/' README.md
  //
  //   // TODO Add GitHub stars into Markdown link if it doesn't exist
  //   // If line includes GitHub link
  //   if(line.indexOf("github") !== -1) {
  //     if(line.indexOf("GitHub stars") === -1) {
  //       console.log(line)
  //     }
  //   }
  //
  //   output += line + '\n'
  // })
}

module.exports = addStars

// Uncomment if not in development. This line works just fine.
// lineReader.on('close', () => fs.writeFile(file, output))
