#!/usr/bin/env node
const Say = require('..').Say
const say = new Say('espeak')

let voices = [
  { voice: 'en-us', text: 'Good  morning', speed: 1 },
  { voice: 'nb', text: 'God morgen', speed: 1 },
  { voice: 'en-us', text: 'Good  morning', speed: 2 },
  { voice: 'nb', text: 'God morgen', speed: 0.5 }
]

sayIt(0)

say.export('whats up, dog?', 'en-us', 0.5, './exported.wav', (error) => {
  if (error) {
    return console.log(error)
  }

  console.log('export complete')
})

say.getInstalledVoices((err, voices) => {
  if (err) {
    console.error(err)
  }
  console.log(voices)
})

function sayIt (voice) {
  let v = voices[voice]
  console.log(v.voice, 'at speed', v.speed)

  say.speak(v.text, v.voice, v.speed, (err) => {
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
