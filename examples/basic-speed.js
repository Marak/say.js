#!/usr/bin/env node

const say = require('../')

console.log('about to speak...')

say.speak('What are you doing?', undefined, 2, (error) => {
  if (error) {
    return console.error(error)
  }

  say.speak('Nothing!', undefined, 0.5, error => {
    if (error) {
      return console.error(error)
    }
    console.log('done')
  })
})
