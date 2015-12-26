'use strict';

var spawn = require('child_process').spawn,
  child;

var say = exports;

if (process.platform === 'darwin') {
  say.speaker = 'say';
}
else if (process.platform === 'linux') {
  say.speaker = 'festival';
}

// say stuff, speak
exports.speak = function(voice, text, callback, speed) {
  var commands,
    pipedData;

  if (arguments.length < 2) {
    console.log('invalid amount of arguments sent to speak()');
    return;
  }

  if (process.platform === 'darwin') {
    if (!voice) {
      commands = [ text ];
    } else {
      commands = [ '-v', voice, text];
    }
    if (speed) {
      commands.push('-r', speed);
    }
  } else if (process.platform === 'linux') {
    commands = ['--pipe'];
    pipedData = '(' + voice + ') (SayText \"' + text + '\")';
  }


  var childD = spawn(say.speaker, commands);

  childD.stdin.setEncoding('ascii');
  childD.stderr.setEncoding('ascii');

  if (process.platform === 'linux') {
    childD.stdin.end(pipedData);
  }


  childD.stderr.on('data', function(data){ console.log(data); });
  childD.stdout.on('data', function(data){ console.log(data); });


  childD.addListener('exit', function (code, signal) {
    if (code === null || signal !== null) {
      console.log('couldnt talk, had an error ' + '[code: '+ code + '] ' + '[signal: ' + signal + ']');
    }

    ////STOP TEST
     child = null;
    //
    // handle callback if given
    if (callback) {
      // we could do better than a try / catch here
      try {
        callback();
      } catch(err) {
        // noop
      }
    }
  });
};

//STOP TEST
exports.stop = function () {
  if (!child) {
    return;
  }
  child.stdin.pause();
  child.kill();
}
