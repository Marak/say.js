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
exports.speak = function(voice, text, callback) {
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

    // we could do better than a try / catch here
    try {
      callback();
    } catch(err) {
      // noop
    }
  });
};

/*
    This code doesnt work....but it could!
    // monkey punch sys.puts to speak, lol
    say.puts();

    sys.puts('whats, up dog?'); // did you hear that?
    exports.puts = function(){

      var s2 = require('util');
      // don't try this at home
      sys.puts = function(text){
        s2.puts(text);
      };
    }
*/
