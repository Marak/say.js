// This file converts symbols into their audible form
// It's essentially a tool for 'escaping' characters for TTS purposes
const lookup = new Map()

// lookup.set(/!/g, ' exclamation mark ')
lookup.set(/@/g, ' at ')
lookup.set(/#/g, ' octothorpe ')
lookup.set(/\$/g, ' dollar sign ')
lookup.set(/%/g, ' percent ')
lookup.set(/\^/g, ' caret ')
lookup.set(/&/g, ' and ')
lookup.set(/\*/g, ' asterisk ')
lookup.set(/\(/g, ' left paren ')
lookup.set(/\)/g, ' right paren ')
lookup.set(/-/g, ' minus ')
lookup.set(/\+/g, ' plus ')
lookup.set(/_/g, ' underscore ')
lookup.set(/=/g, ' equals ')
lookup.set(/"/g, ' quote ')
// lookup.set(/'/g, ' single quote ') // would break words like "don't"
lookup.set(/\]/g, ' right bracket ')
lookup.set(/\[/g, ' left bracket ')
lookup.set(/\}/g, ' right curly ')
lookup.set(/\{/g, ' left curly ')
lookup.set(/\|/g, ' pipe ')
lookup.set(/\//g, ' slash ')
lookup.set(/\\/g, ' backslash ')
// lookup.set(/:/g, ' colon ')
// lookup.set(/;/g, ' semicolon ')
// lookup.set(/./g, ' period ')
// lookup.set(/,/g, ' comma ')
// lookup.set(/?/g, ' question mark ')
lookup.set(/`/g, ' backtick ')
lookup.set(/~/g, ' tilde ')
lookup.set(/>/g, ' greater than ')
lookup.set(/</g, ' less than ')
lookup.set(/\r/g, ' ')
lookup.set(/\n/g, ' ')

module.exports = (text) => {
  lookup.forEach((after, before) => {
    text = text.replace(before, after)
  })

  return text
}
