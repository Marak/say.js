#!/usr/bin/env node

// Usage:
//   node allvoices "Some phrase to say"
// or
//   ./allvoices.js
//
// Iterates over all supported voices and
// repeats the input phrase

const say = require('../')

let voices = [
  { voice: 'Alex', text: 'Most people recognize me by my voice.' },
  { voice: 'Amelie', text: 'Bonjour, je m’appelle Amelie. Je suis une voix canadienne.' },
  { voice: 'Kyoko', text: 'こんにちは、私の名前はKyokoです。日本語の音声をお届けします。' },
  { voice: 'Samantha', text: 'Hello, my name is Samantha. I am an American-English voice.' },
  { voice: 'Yuna', text: '안녕하세요. 제 이름은 Yuna입니다. 저는 한국어 음성입니다.' }
]

sayIt(0)

function sayIt (voice) {
  let v = voices[voice]
  console.log(v.voice)

  say.speak(v.text, v.voice, 1, () => {
    voice++

    if (voice >= voices.length) {
      process.exit(0)
    }

    sayIt(voice)
  })
}
