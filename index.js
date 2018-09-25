const lib = require('./lib/methods.js')

function editLines (input, opts) {
  opts = opts || {}
  // If Input is not an array, make it one
  // If it is an array, go on the assumption it is split on newline
  if (!Array.isArray(input)) {
    input = input.split('\n')
  }

  return input.map((line) => {
    if (opts.ignore && line.indexOf(opts.ignore) !== -1) {
      return line
    }
    line = lib.addStarsBadge(line, opts)
    return line
  }).join('\n')
}

module.exports = editLines
