'use strict';

var child_process = require('child_process');
var path = require('path');
var say = exports;
var childD;

// use the correct library per platform
if (process.platform === 'darwin') {
  say.speaker = 'say';
  say.base_speed = 175;
} else if (process.platform === 'linux') {
  say.speaker = 'festival';
  say.base_speed = 100;
} else if (process.platform === 'win32') {
  say.speaker = 'powershell';
}

/**
 * Uses system libraries to speak text via the speakers.
 *
 * @param {string} text Text to be spoken
 * @param {string|null} voice Name of voice to be spoken with
 * @param {number|null} speed Speed of text (e.g. 1.0 for normal, 0.5 half, 2.0 double)
 * @param {Function|null} callback A callback of type function(err) to return.
 */
say.speak = function(text, voice, speed, callback) {
  var commands, pipedData;

  if (typeof callback !== 'function') {
    callback = function() {};
  }

  if (!text) {
    // throw TypeError because API was used incorrectly
    throw new TypeError('Must provide text parameter');
  }

  // tailor command arguments to specific platforms
  if (process.platform === 'darwin') {
    if (!voice) {
      commands = [ text ];
    } else {
      commands = [ '-v', voice, text];
    }

    if (speed) {
      commands.push('-r', convertSpeed(speed));
    }
  } else if (process.platform === 'linux') {
    commands = ['--pipe'];

    if (speed) {
      pipedData = '(Parameter.set \'Audio_Command "aplay -q -c 1 -t raw -f s16 -r $(($SR*' + convertSpeed(speed) + '/100)) $FILE") ';
    }

    if (voice) {
      pipedData += '(' + voice + ') ';
    }

    pipedData += '(SayText \"' + text + '\")';
  } else if (process.platform === 'win32') {
    pipedData = text;
    commands = [ 'Add-Type -AssemblyName System.speech; $speak = New-Object System.Speech.Synthesis.SpeechSynthesizer; $speak.Speak([Console]::In.ReadToEnd())' ];
  } else {
    // if we don't support the platform, callback with an error (next tick) - don't continue
    return process.nextTick(function() {
      callback(new Error('say.js speak does not support platform ' + process.platform));
    });
  }

  var options = (process.platform === 'win32') ? { shell: true } : undefined;
  childD = child_process.spawn(say.speaker, commands, options);

  childD.stdin.setEncoding('ascii');
  childD.stderr.setEncoding('ascii');

  if (pipedData) {
    childD.stdin.end(pipedData);
  }

  childD.stderr.once('data', function(data) {
    // we can't stop execution from this function
    callback(new Error(data));
  });

  childD.addListener('exit', function (code, signal) {
    if (code === null || signal !== null) {
      return callback(new Error('say.js: could not talk, had an error [code: ' + code + '] [signal: ' + signal + ']'));
    }

    childD = null;

    callback(null);
  });
};

say.export = function(text, voice, speed, filename, callback) {
  var commands, pipedData;

  if (!text) {
    // throw TypeError because API was used incorrectly
    throw new TypeError('Must provide text parameter');
  }

  if (!filename) {
    // throw TypeError because API was used incorrectly
    throw new TypeError('Must provide a filename');
  }

  if (typeof callback !== 'function') {
    callback = function() {};
  }

  // tailor command arguments to specific platforms
  if (process.platform === 'darwin') {

    if (!voice) {
      commands = [ text ];
    } else {
      commands = [ '-v', voice, text];
    }

    if (speed) {
      commands.push('-r', convertSpeed(speed));
    }

    if (filename){
        commands.push('-o', filename, '--data-format=LEF32@32000');
    }
  }  else {
    // if we don't support the platform, callback with an error (next tick) - don't continue
    return process.nextTick(function() {
      callback(new Error('say.js export does not support platform ' + process.platform));
    });
  }

  childD = child_process.spawn(say.speaker, commands);

  childD.stdin.setEncoding('ascii');
  childD.stderr.setEncoding('ascii');

  if (pipedData) {
    childD.stdin.end(pipedData);
  }

  childD.stderr.once('data', function(data) {
    // we can't stop execution from this function
    callback(new Error(data));
  });

  childD.addListener('exit', function (code, signal) {
    if (code === null || signal !== null) {
      return callback(new Error('say.js: could not talk, had an error [code: ' + code + '] [signal: ' + signal + ']'));
    }

    childD = null;

    callback(null);
  });
};


/**
 * Stops currently playing audio. There will be unexpected results if multiple audios are being played at once
 *
 * TODO: If two messages are being spoken simultaneously, childD points to new instance, no way to kill previous
 */
exports.stop = function(callback) {
  if (typeof callback !== 'function') {
    callback = function() {};
  }

  if (!childD) {
    return callback(new Error('No speech to kill'));
  }

  if (process.platform === 'linux') {
    // TODO: Need to ensure the following is true for all users, not just me. Danger Zone!
    // On my machine, original childD.pid process is completely gone. Instead there is now a
    // childD.pid + 1 sh process. Kill it and nothing happens. There's also a childD.pid + 2
    // aplay process. Kill that and the audio actually stops.
    process.kill(childD.pid + 2);
  } else if (process.platform === 'win32') {
    childD.stdin.pause();
    child_process.exec('taskkill /pid ' + childD.pid + ' /T /F')
  } else {
    childD.stdin.pause();
    childD.kill();
  }

  childD = null;

  callback(null);
};

function convertSpeed(speed) {
  return Math.ceil(say.base_speed * speed);
}
