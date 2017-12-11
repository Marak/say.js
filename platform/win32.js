const childProcess = require('child_process')

const SayPlatformBase = require('./base.js')

const BASE_SPEED = 0 // Unsupported
const COMMAND = 'powershell'

class SayPlatformWin32 extends SayPlatformBase {
  constructor () {
    super()
    this.baseSpeed = BASE_SPEED
  }

  buildCommand ({text, voice, speed, filename, dataFormatInfo}) {
    let args = []
    let pipedData = ''
    let options = {}

    let psCommand = `Add-Type -AssemblyName System.speech;$speak = New-Object System.Speech.Synthesis.SpeechSynthesizer;`

    if (voice) {
      psCommand += `$speak.SelectVoice('${voice}');`
    }

    if (speed) {
      let adjustedSpeed = this.convertSpeed(speed || 1)
      psCommand += `$speak.Rate = ${adjustedSpeed};`
    }

    if (filename) {
      const audioBitsPerSample = (dataFormatInfo.sampleSize <= 8) ? 'Eight' : 'Sixteen'
      const escapedFilename = filename.replace(/\\/g, '\\\\').replace(/"/g, '\\"\\"').replace(/`/g, '``')
      psCommand += `$formatSampleSize = [System.Speech.AudioFormat.AudioBitsPerSample]::${audioBitsPerSample};`
      psCommand += `$formatChannels = [System.Speech.AudioFormat.AudioChannel]::Mono;`
      psCommand += `$format = New-Object System.Speech.AudioFormat.SpeechAudioFormatInfo ${dataFormatInfo.sampleRate}, $formatSampleSize, $formatChannels;`
      psCommand += `$speak.SetOutputToWaveFile(\\"${escapedFilename}\\", $format);`
    }

    psCommand += `$speak.Speak([Console]::In.ReadToEnd())`

    pipedData += text
    args.push(psCommand)
    options.shell = true

    return {command: COMMAND, args, pipedData, options}
  }

  buildSpeakCommand ({text, voice, speed}) {
    return this.buildCommand({text, voice, speed})
  }

  buildExportCommand ({text, voice, speed, filename, dataFormatInfo}) {
    return this.buildCommand({text, voice, speed, filename, dataFormatInfo})
  }

  runStopCommand () {
    this.child.stdin.pause()
    childProcess.exec(`taskkill /pid ${this.child.pid} /T /F`)
  }

  convertSpeed (speed) {
    // Overriden to map playback speed (as a ratio) to Window's values (-10 to 10, zero meaning x1.0)
    return Math.max(-10, Math.min(Math.round((9.0686 * Math.log(speed)) - 0.1806), 10))
  }
}

module.exports = SayPlatformWin32
