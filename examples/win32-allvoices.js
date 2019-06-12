#!/usr/bin/env node

// Usage:
//   ./allvoices.js
//
// Iterates over all supported voices and
// repeats the input phrase

const say = require('../')

let voices = [
  { voice: 'Microsoft David Desktop', text: 'No people recognize me by my voice.' },
  { voice: 'Microsoft Zira Desktop', text: 'No people recognize me by my voice.' }
]

sayIt(0)

function sayIt (voice) {
  let v = voices[voice]
  console.log(v.voice)

  say.speak(v.text, v.voice, 1, (err) => {
    voice++

    if (err) {
      console.error(err)
    }

    if (voice >= voices.length) {
      process.exit(0)
    }

    sayIt(voice)
  })
}
