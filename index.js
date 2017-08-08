function addStarsBadge (line) {
  // Isolate []() links (We're only putting them in the square brackets)
  // Check if there is already a GitHub stars badge in the []
  // If the link is to a GitHub Repo in the (), add badge

  var link = new RegExp('\[\(.*\)\](https:\/\/github.com\/\([^ )]*\))\(.*\)')

  if (line.indexOf('https://github.com/') !== -1) {
    if (line.indexOf('GitHub stars') === -1) {
      console.log(line)
      return line
    }
  }

  return line
}

function editLines (input) {
  // If Input is not an array, make it one
  // If it is an array, go on the assumption it is split on newline
  if (!Array.isArray(input)) {
    input = input.split('\n')
  }

  return input.map((line) => {
    // Add GitHub stars into Markdown link if it doesn't exist
    // If line includes GitHub link
    // TODO Make this regex more comprehensible using multiple JavaScript regexes
    // sed  s/^\* \[\(.*\)\](https:\/\/github.com\/\([^ )]*\))\(.*\)/* [\1 \![GitHub stars]\(https:\/\/img.shields.io\/github\/stars\/\2.svg\)]\(https:\/\/github.com\/\2\)\3/' README.md
    line = addStarsBadge(line)
    return line
  })

  // Out of Scope of this module - rename module before publishing?
  // TODO Create possible other module - list-cleaner?
  // TODO Make sure that description matches `...) - desc`. format
  // TODO Add periods on ends of descriptions
  // TODO Automatically get descriptions (requires major refactor)
}

module.exports = {editLines, addStarsBadge}
