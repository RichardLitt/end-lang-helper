/* eslint-env mocha */
const assert = require('assert')
const editLines = require('../index.js')
const lib = require('../lib/methods.js')

// TODO Remove this test and add real ones
describe('Add Stars', function () {
  it('should be able to read a string', function () {
    var string = 'This is a string.'
    assert.equal(string, editLines(string))
  })
})

describe('parseInput', function () {
  it('should return nothing if no match', function () {
    var string = 'This is a string.'
    assert.equal(null, lib.parseInput(string))
  })

  it('should return an object if match', function () {
    var string = 'This is [good](https://github.com/good/good)'
    assert.deepEqual({
      "description": "",
      "link": "https://github.com/good/good",
      "location": "good/good",
      "startLine": "This is ",
      "title": "good"
    }, lib.parseInput(string))
  })
})

// TODO Find a way to test methods in index.js without exporting them
// How do you export the default method, and other submethods, too?
describe('Add stars badge', function () {
  it('should work with badges with multiple links ', function () {
    var string = '* [foo ![GitHub stars](https://img.shields.io/github/stars/foo/bar.svg)](https://github.com/foo/bar)  and [baz](https://github.com/foo/baz) bar'
    var newString = '* [foo ![GitHub stars](https://img.shields.io/github/stars/foo/bar.svg)](https://github.com/foo/bar)  and [baz](https://github.com/foo/baz) bar'
    assert.equal(newString, lib.addStarsBadge(string))
  })

  it('should work with badges with multiple links ', function () {
    var string = '- [foo](https://github.com/foo/bar) <!-- ell:ignore -->'
    var newString = '- [foo](https://github.com/foo/bar) <!-- ell:ignore -->'
    assert.equal(newString, lib.addStarsBadge(string, {ignore: '<!-- ell:ignore -->'}))
  })

  it('should not replace strings without links', function () {
    var string = 'This is a string'
    assert.equal(string, lib.addStarsBadge(string))
  })

  it('should not edit strings with badges already', function () {
    var string = 'This is [good ![GitHub stars](https://img.shields.io/github/stars/good/good.svg)](https://github.com/good/good)'
    assert.equal(string, lib.addStarsBadge(string))
  })

  it('should not add dashes to descriptions', function () {
    var string = 'This is [good ![GitHub stars](https://img.shields.io/github/stars/good/good.svg)](https://github.com/good/good) with bad description'
    var newStr = 'This is [good ![GitHub stars](https://img.shields.io/github/stars/good/good.svg)](https://github.com/good/good) - with bad description.'
    assert.equal(newStr, lib.addStarsBadge(string))
  })

  it('should only edit lines starting with dashes or asterix, given the option', function () {
    var string = 'This is [good](https://github.com/good/good)'
    assert.equal(string, lib.addStarsBadge(string, {startLine: ' - '}))
  })

  it('should edit lines starting with dashes or asterix, given the option', function () {
    var string = 'This is [good](https://github.com/good/good) with bad description'
    var newStr = '- This is [good ![GitHub stars](https://img.shields.io/github/stars/good/good.svg)](https://github.com/good/good) - with bad description.'
    assert.equal(string, lib.addStarsBadge(string, {startLine: ' - '}))
  })

  it('should trim spaces in titles', function () {
    var string = 'This is a [ test ](https://github.com/test/test)'
    var newString = 'This is a [test ![GitHub stars](https://img.shields.io/github/stars/test/test.svg)](https://github.com/test/test)'
    assert.equal(newString, lib.addStarsBadge(string))
  })

  it('should be able to parse links with parens inside of them', function () {
    var string = 'This is a [test(test) ](https://github.com/test/test)'
    var newString = 'This is a [test(test) ![GitHub stars](https://img.shields.io/github/stars/test/test.svg)](https://github.com/test/test)'
    assert.equal(newString, lib.addStarsBadge(string))
  })

  it('should only touch links to github', function () {
    var string = 'This is a [string](http://example.com)'
    assert.equal(string, lib.addStarsBadge(string))
  })

  it('should only touch links to github even if there are other links', function () {
    var string = 'This is a [string](http://example.com) [github](https://github.com/test/test)'
    var newString = 'This is a [string](http://example.com) [github ![GitHub stars](https://img.shields.io/github/stars/test/test.svg)](https://github.com/test/test)'
    assert.equal(newString, lib.addStarsBadge(string))
  })

  it('should only touch links to github if they are to repos', function () {
    var string = 'This is a [string](http://example.com) [github](https://github.com)'
    assert.equal(string, lib.addStarsBadge(string))
    string = 'This is a [string](http://example.com) [github](https://github.com/user)'
    assert.equal(string, lib.addStarsBadge(string))
    string = 'This is a [string](http://example.com) [github](https://github.com/user/repo/issues)'
    assert.equal(string, lib.addStarsBadge(string))

    string = 'This is a [string](http://example.com) [github](https://github.com/user/repo)'
    var newString = 'This is a [string](http://example.com) [github ![GitHub stars](https://img.shields.io/github/stars/user/repo.svg)](https://github.com/user/repo)'
    assert.equal(newString, lib.addStarsBadge(string))
  })

  it('should not change multiple links', function () {
    var string = 'This is [github](http://github.com/one/two) [github](https://github.com/three/four)'
    var newString = 'This is [github ![GitHub stars](https://img.shields.io/github/stars/one/two.svg)](https://github.com/one/two) - [github](https://github.com/three/four).'
    assert.equal(newString, lib.addStarsBadge(string))
  })

  it('should add the badge even if there are images in the links', function () {
    var string = 'This is [github ![alt text](https://example.com/images.svg)](http://github.com/one/two)'
    var newString = 'This is [github ![alt text](https://example.com/images.svg) ![GitHub stars](https://img.shields.io/github/stars/one/two.svg)](https://github.com/one/two)'
    assert.equal(newString, lib.addStarsBadge(string))
  })

  it('should update GitHub Stars badge repo if it doesn\'t match the link', function () {
    var string = 'This is a [test ![GitHub stars](https://img.shields.io/github/stars/test/test.svg)](https://github.com/test/CHANGE)'
    var newString = 'This is a [test ![GitHub stars](https://img.shields.io/github/stars/test/CHANGE.svg)](https://github.com/test/CHANGE)'
    assert.equal(newString, lib.addStarsBadge(string))
  })

  it('should update GitHub Stars badge user if it doesn\'t match the link', function () {
    var string = 'This is a [test ![GitHub stars](https://img.shields.io/github/stars/test/test.svg)](https://github.com/CHANGE/test)'
    var newString = 'This is a [test ![GitHub stars](https://img.shields.io/github/stars/CHANGE/test.svg)](https://github.com/CHANGE/test)'
    assert.equal(newString, lib.addStarsBadge(string))
  })

  it('should update GitHub Stars badge user and repo if it doesn\'t match the link', function () {
    var string = 'This is a [test ![GitHub stars](https://img.shields.io/github/stars/test/test.svg)](https://github.com/CHANGE/CHANGE)'
    var newString = 'This is a [test ![GitHub stars](https://img.shields.io/github/stars/CHANGE/CHANGE.svg)](https://github.com/CHANGE/CHANGE)'
    assert.equal(newString, lib.addStarsBadge(string))
  })

  it('should not assume a descrption', function () {
    var string = 'This is a [test ![GitHub stars](https://img.shields.io/github/stars/test/test.svg)](https://github.com/test/test)'
    var newString = 'This is a [test ![GitHub stars](https://img.shields.io/github/stars/test/test.svg)](https://github.com/test/test)'
    assert.equal(newString, lib.addStarsBadge(string))
  })
})

describe('addPeriod', function () {
  it('should add a period at the end of the line', function (done) {
    var string = 'This is a new line'
    assert.equal(string + '.', lib.addPeriod(string))
    done()
  })

  it('should not add a period if one exists', function (done) {
    var string = 'This is a new line.'
    assert.equal(string, lib.addPeriod(string))
    done()
  })
})

describe('addDesc', function () {
  it('should remove multiple final periods', function (done) {
    var string = ' - This is a new line..'
    assert.equal(string.slice(0, -1), lib.addDesc(string))
    done()
  })

  it('should return a clean line', function (done) {
    var string = ' - This is a new line.'
    assert.equal(string, lib.addDesc(string))
    done()
  })
  
  it('should work', function (done) {
    var string = 'Take a look at [the awesome lists collection](https://github.com/sindresorhus/awesome).'
    var newString = 'Take a look at [the awesome lists collection](https://github.com/sindresorhus/awesome).'
    assert.equal(string, lib.addDesc(string))
  })

  it('should replace any existing spaces', function (done) {
    var string = 'This is a new line.'
    assert.equal(' - ' + string, lib.addDesc('    ' + string))
    done()
  })

  it('should replace any existing dashes', function (done) {
    var string = 'This is a new line.'
    assert.equal(' - ' + string, lib.addDesc('---' + string))
    done()
  })
})