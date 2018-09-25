function extractUrls (input) {
  const linkText = '\\[([^\\[]*?)\\]'
  const link = '\\((http(?:s?)://github\\.com[^\\)]*)\\)'
  const re = new RegExp(linkText + link, 'g')
  var matches
  const urls = []
  while (matches === re.exec(input)) {
    urls.push(matches)
  }
  return urls
}

function parseInput (line, opts) {
  var obj = {}
  var firstUrl
  var startLine = (opts && opts.startLine) ? new RegExp('(' + opts.startLine + ')') : '([^\\[]*)'
  var lineRegex = new RegExp(startLine + '\\[(.*?)\\]\\((https://github.com/([^ \\)]*))\\)(.*)')
  var match = line.match(lineRegex)
  var urls = extractUrls(line)

  // TODO Ignore ignored urls from opts

  // I was unable to stop at the first URL, so this is my way of getting around it
  // I am ashamed of this code, but it seems to work.
  // TODO (.*) should stop at ]()
  // Unless there is an image

  if (match && match.length === 6 && urls.length >= 2) {
    obj.startLine = match[1]
    firstUrl = urls[0]
    obj.title = firstUrl[1].trim()
    obj.link = firstUrl[2]
    obj.location = firstUrl[2].replace(/http(?:s?):\/\/github\.com\//, '') // In form user/repo
    obj.description = firstUrl.input.slice(firstUrl.index + firstUrl[0].length)
    return obj
  } else if (match && match.length === 6) {
    obj.startLine = match[1]
    obj.title = match[2].trim()
    obj.link = match[3]
    obj.location = match[4] // In form user/repo
    obj.description = match[5]
    return obj
  }
}

function addStarsBadge (line, opts) {
  opts = opts || {}

  const match = parseInput(line, opts)

  if (match) {
    // TODO GitHub Link should parse and stop if there is a non-image link
    // This requires some sort of lookahead

    // Base usecase: if it doesn't already have stars and links to GitHub
    if (
      // If it is a GitHub repository
      match.link.indexOf('github.com') !== -1 &&
      // Ignore organization links
      match.location.split('/').length === 2 &&
      // Only touch links without star links already
      match.title.indexOf('GitHub stars') === -1
    ) {
      return `${match.startLine}[${match.title} ![GitHub stars](https://img.shields.io/github/stars/${match.location}.svg)](https://github.com/${match.location})${addDesc(match.description)}`
    // If GitHub Stars already exists, validate it
    } else if (
      match.link.indexOf('github.com') !== -1 &&
      match.location.split('/').length === 2
    ) {
      // Replace title with new, validated title
      var starsBadge = match.title.match(new RegExp('([^\\[]*)!\\[GitHub stars\\]\\((.*)\\)'))
      return `${match.startLine}[${starsBadge[1]}![GitHub stars](https://img.shields.io/github/stars/${match.location}.svg)](https://github.com/${match.location})${addDesc(match.description)}`
    }
  }
  return line
}

// TODO Automatically get descriptions
// TODO Make a way of ignoring descriptions if they are manually written
function addDesc (description) {
  // TODO This won't be done for any lines which don't get corrected. Fix this.
  if (description) {
    var out = ' - ' + description.replace(/^([- ]*)/, '').replace(/\.+$/, '')
    return addPeriod(out)
  }
  return ''
}

function addPeriod (line) {
  return (line[line.length - 1] !== '.') ? line + '.' : line
}

module.exports = { extractUrls, parseInput, addStarsBadge, addPeriod, addDesc }
