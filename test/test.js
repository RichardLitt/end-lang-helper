/* eslint-env mocha */
const assert = require('assert')
const addStars = require('../.')

// TODO Remove this test and add real ones
describe('Add Stars', function () {
  it('should be able to read a string', function () {
    var string = 'This is a string'
    assert.equal(string, addStars.editLines(string))
  })
})

// TODO Find a way to test methods in index.js without exporting them
// How do you export the default method, and other submethods, too?
describe('Add stars badge', function () {
  it('should not replace strings without links', function () {
    var string = 'This is a string'
    assert.equal(string, addStars.addStarsBadge(string))
  })
  
  it('should not edit strings with badges already', function () {
    var string = 'This is [good ![GitHub stars](https://img.shields.io/github/stars/good/good.svg)](https://github.com/good/good)'
    assert.equal(string, addStars.addStarsBadge(string))
  })
  
  it('should not edit strings with badges already, anywhere in line', function () {
    var string = 'This is [good ![GitHub stars](https://img.shields.io/github/stars/good/good.svg)](https://github.com/good/good) with line after'
    assert.equal(string, addStars.addStarsBadge(string))
  })
  
  it('should be able to parse links with parens inside of them', function () {
    var string = 'This is a [ test(test) ](https://github.com/test/test)'
    var newString = 'This is a [ test(test) ![GitHub stars](https://img.shields.io/github/stars/test/test.svg)](https://github.com/test/test)'
    assert.equal(newString, addStars.addStarsBadge(string))
  })
  
  it('should only touch links to github', function () {
    var string = 'This is a [string](http://example.com)'
    assert.equal(string, addStars.addStarsBadge(string))
  })
  
  it('should only touch links to github even if there are other github links', function () {
    var string = 'This is a [string](http://example.com) [github](https://github.com/test/test)'
    assert.equal(string, addStars.addStarsBadge(string))
  })
  
  it('should only touch links to github if they are to repos', function () {
    var string = 'This is a [string](http://example.com) [github](https://github.com)'
    assert.equal(string, addStars.addStarsBadge(string))
    string = 'This is a [string](http://example.com) [github](https://github.com/user)'
    assert.equal(string, addStars.addStarsBadge(string))
    string = 'This is a [string](http://example.com) [github](https://github.com/user/repo/issues)'
    assert.equal(string, addStars.addStarsBadge(string))

    string = 'This is a [string](http://example.com) [github](https://github.com/user/repo)'
    var newString = 'This is a [string](http://example.com) [github ![GitHub stars](https://img.shields.io/github/stars/user/repo.svg)](https://github.com/user/repo)'
    assert.equal(newString, addStars.addStarsBadge(string))
  })
  
  it('should be able to change multiple links', function () {
    var string = 'This is [github](http://github.com/user/repo) [github](https://github.com/user/repo)'
    var newString = 'This is [github ![GitHub stars](https://img.shields.io/github/stars/user/repo.svg)](https://github.com/user/repo)) [github ![GitHub stars](https://img.shields.io/github/stars/user/repo.svg)](https://github.com/user/repo)'
    assert.equal(newString, addStars.addStarsBadge(string))
  })
  
  it('should update GitHub Stars badge repo if it doesn\'t match the link', function () {
    var string = 'This is a [test ![GitHub stars](https://img.shields.io/github/stars/test/test.svg)](https://github.com/test/CHANGE)'
    var newString = 'This is a [test ![GitHub stars](https://img.shields.io/github/stars/test/CHANGE.svg)](https://github.com/test/CHANGE)'
    assert.equal(newString, addStars.addStarsBadge(string))
  })
  
  it('should update GitHub Stars badge user if it doesn\'t match the link', function () {
    var string = 'This is a [test ![GitHub stars](https://img.shields.io/github/stars/test/test.svg)](https://github.com/CHANGE/test)'
    var newString = 'This is a [test ![GitHub stars](https://img.shields.io/github/stars/CHANGE/test.svg)](https://github.com/CHANGE/test)'
    assert.equal(newString, addStars.addStarsBadge(string))
  })
  
  it('should update GitHub Stars badge user and repo if it doesn\'t match the link', function () {
    var string = 'This is a [test ![GitHub stars](https://img.shields.io/github/stars/test/test.svg)](https://github.com/CHANGE/CHANGE)'
    var newString = 'This is a [test ![GitHub stars](https://img.shields.io/github/stars/CHANGE/CHANGE.svg)](https://github.com/CHANGE/CHANGE)'
    assert.equal(newString, addStars.addStarsBadge(string))
  })
})