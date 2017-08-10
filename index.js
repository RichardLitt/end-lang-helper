const lib = require('./lib/methods.js')

function editLines (input) {
  // If Input is not an array, make it one
  // If it is an array, go on the assumption it is split on newline
  if (!Array.isArray(input)) {
    input = input.split('\n')
  }

  return input.map((line) => {
    line = lib.addStarsBadge(line)
    line = lib.addPeriod(line)
    return line
  })
}

module.exports = editLines
