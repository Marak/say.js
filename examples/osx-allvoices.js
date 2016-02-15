#!/usr/bin/env node

// Usage:
//   node allvoices "Some phrase to say"
// or
//   ./allvoices.js
//
// Iterates over all supported voices and
// repeats the input phrase 

'use strict'

var say = require('../');
var text = process.argv[2] || "Hello World";
var voices = [
  "Agnes",
  "Kathy",
  "Princess",
  "Vicki",
  "Victoria",
  "Albert",
  "Alex",
  "Bruce",
  "Fred",
  "Junior",
  "Ralph",
  "Bad News",
  "Bahh",
  "Bells",
  "Boing",
  "Bubbles",
  "Cellos",
  "Deranged",
  "Good News",
  "Hysterical",
  "Pipe Organ",
  "Trinoids",
  "Whisper",
  "Zarvox"
];

sayIt(0);

function sayIt(voice) {
  console.log(voices[voice]);

  say.speak(text, voices[voice], undefined, function() {
    voice++;

    if (voice >= voices.length) {
      process.exit(0);
    }

    sayIt(voice);
  }); 
}
