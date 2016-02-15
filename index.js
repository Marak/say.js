'use strict';

var spawn = require('child_process').spawn;
var say = exports;
var childD;

// use the correct library per platform
if (process.platform === 'darwin') {
  say.speaker = 'say';
} else if (process.platform === 'linux') {
  say.speaker = 'festival';
} else if (process.platform === 'win32') {
  say.speaker = 'cmd';
}

/**
 * Uses system libraries to speak text via the speakers.
 * @param  {string|null}   voice    The specified voice to use when speaking.
 * @param  {string}   text     [description]
 * @param  {Function} callback A callback of type function(err) to return.
 *                             Err will be null if there is not an error; if
 *                             there is an error, it will be of type Error.
 */
say.speak = function(voice, text, callback) {
  var commands, pipedData;

  if (typeof callback !== 'function') {
    callback = function() {};
  }

  if (arguments.length < 2) {
    // throw TypeError because API was used incorrectly
    throw new TypeError('invalid amount of arguments sent to say.js speak');
  }

  // tailor command arguments to specific platforms
  if (process.platform === 'darwin') {
    if (!voice) {
      commands = [ text ];
    } else {
      commands = [ '-v', voice, text];
    }
  } else if (process.platform === 'linux') {
    commands = ['--pipe'];
    pipedData = '(' + voice + ') (SayText \"' + text + '\")';
  } else if (process.platform === 'win32') {
    commands = [ '/s /c "'+path.join(__dirname, 'say.vbs')+' '+JSON.stringify (text)+'"' ];
  } else {
    // if we don't support the platform, callback with an error (next tick) - don't continue
    return process.nextTick(function() {
      callback(new Error('say.js speak does not support platform ' + process.platform));
    });
  }

  var options = (process.platform === 'win32') ? { windowsVerbatimArguments: true } : undefined;
  childD = spawn(say.speaker, commands, options);

  childD.stdin.setEncoding('ascii');
  childD.stderr.setEncoding('ascii');

  if (process.platform === 'linux') {
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

// TODO: If two messages are being spoken simultaneously, childD points to new instance, no way to kill previous.
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
  } else {
    childD.stdin.pause();
    childD.kill('SIGINT');
  }

  childD = null;

  callback(null);
};
