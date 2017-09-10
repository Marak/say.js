#!/usr/bin/env node

const say = require('../')

// no callback, fire and forget
say.speak('whats up, dog?', 'Alex')

// no callback, fire and forget
say.speak('whats up, dog?', 'Cellos', 0.5)

// output some text to the console as the callback
say.speak('whats up, dog?', 'Good News', 1.0, (error) => {
  if (error) {
    console.log(error)
  }

  console.log('text to speech complete')
})
