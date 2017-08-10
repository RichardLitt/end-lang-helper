function addStarsBadge (line) {
  // Isolate []() links (We're only putting them in the square brackets)
  // Check if there is already a GitHub stars badge in the []
  // If the link is to a GitHub Repo in the (), add badge

  var link = new RegExp('\\[(.*)\\]\\(https:\/\/github.com\/([^ \\)]*)\\)(.*)') // '(https:\/\/github.com\/\([^ )]*)\)\(.*\)')

  // sed  s/^\* \[\(.*\)\](https:\/\/github.com\/\([^ )]*\))\(.*\)/
  // * [\1 \![GitHub stars]\(https:\/\/img.shields.io\/github\/stars\/\2.svg\)]\(https:\/\/github.com\/\2\)\3/' README.md

  if (line.indexOf('https://github.com/') !== -1) {
    if (line.indexOf('GitHub stars') === -1) {
      console.log(line.match(link))
      // Run: node cli.js '* [Test](https://github.com/user/repo) test.'
      return line
    }
  }

  return line
}

// TODO Make sure that description matches `...) - desc`. format
// TODO Automatically get descriptions (requires major refactor)

function addPeriod (line) {
  if (line[line.length-1] !== '.') {
    line = line + '.'
    return line
  }
  return line
}

module.exports = { addStarsBadge, addPeriod }
