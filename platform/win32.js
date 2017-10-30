const childProcess = require('child_process')

const SayPlatformBase = require('./base.js')

const BASE_SPEED = 0 // Unsupported
const COMMAND = 'powershell'

class SayPlatformWin32 extends SayPlatformBase {
  constructor () {
    super()
    this.baseSpeed = BASE_SPEED
  }

  buildSpeakCommand ({text, voice, speed}) {
    let args = []
    let pipedData = ''
    let options = {}

    let psCommand = `Add-Type -AssemblyName System.speech;$speak = New-Object System.Speech.Synthesis.SpeechSynthesizer;`

    if (voice) {
      psCommand += `$speak.SelectVoice('${voice}');`
    }

    psCommand += `$speak.Speak([Console]::In.ReadToEnd())`

    pipedData += text
    args.push(psCommand)
    options.shell = true

    return {command: COMMAND, args, pipedData, options}
  }

  buildExportCommand ({text, voice, speed, filename}) {
    throw new Error(`say.export(): does not support platform ${this.platform}`)
  }

  runStopCommand () {
    this.child.stdin.pause()
    childProcess.exec(`taskkill /pid ${this.child.pid} /T /F`)
  }
}

module.exports = SayPlatformWin32
