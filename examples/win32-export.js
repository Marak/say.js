const say = require('say')
const path = require('path')

// Export spoken audio to a WAV file
say.export("I'm sorry, Dave.", 'Microsoft David Desktop', 0.75, path.join(__dirname, 'hal.wav'), (err) => {
  if (err) {
    return console.error(err)
  }

  console.log('Text has been saved to hal.wav.')
})
