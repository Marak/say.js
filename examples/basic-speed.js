#!/usr/bin/env node

const say = require('../')

console.log('about to speak quickly...')

say.speak('What are you doing?', undefined, 2, (error) => {
  if (error) {
    return console.error(error)
  }

  console.log('about to speak slowly...')

  say.speak('Nothing!', undefined, 0.5, error => {
    if (error) {
      return console.error(error)
    }
    console.log('done')
  })
})
