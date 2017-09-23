#!/usr/bin/env node

const say = require('../')

console.log('about to speak...')

say.speak('What are you doing?', undefined, undefined, (error) => {
  if (error) {
    return console.error(error)
  }

  console.log('done')
})
