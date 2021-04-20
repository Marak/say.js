const SayPlatformBase = require('./base.js')

const BASE_SPEED = 175
const COMMAND = 'espeak'

class SayPlatformEspeak extends SayPlatformBase {
  constructor () {
    super()
    this.baseSpeed = BASE_SPEED
    this.voicesSep = '\n'
  }

  buildSpeakCommand ({ text, voice, speed }) {
    let args = []
    let pipedData = ''
    let options = {}

    if (!voice) {
      args.push(text)
    } else {
      args.push('-v', voice, text)
    }

    if (speed) {
      args.push('-s', this.convertSpeed(speed))
    }

    return { command: COMMAND, args, pipedData, options }
  }

  buildExportCommand ({ text, voice, speed, filename }) {
    let args = []
    let pipedData = ''
    let options = {}

    if (!voice) {
      args.push(text)
    } else {
      args.push('-v', voice, text)
    }

    if (speed) {
      args.push('-s', this.convertSpeed(speed))
    }

    if (filename) {
      args.push('-w', filename)
    }

    return { command: COMMAND, args, pipedData, options }
  }

  runStopCommand () {
    this.child.stdin.pause()
    this.child.kill()
  }

  filterVoices (voices) {
    return voices.slice(1).map(
      line => { return line.split(/[ ,]+/)[4] }
    )
  }

  getVoices () {
    let args = []
    let psCommand = '--voices'
    args.push(psCommand)
    return { command: COMMAND, args }
  }
}

module.exports = SayPlatformEspeak
