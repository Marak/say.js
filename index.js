// This is a modified version of say.js by Marak Squires http://github.com/marak/say.js/

/*
Copyright (c) 2010 Marak Squires http://github.com/marak/say.js/
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:
The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
'use strict';
var spawn = require('child_process').spawn,
var speechProcess;
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


 speechProcess = spawn(say.speaker, commands);
  speechProcess.stdin.setEncoding('ascii');
  speechProcess.stderr.setEncoding('ascii');


  if (process.platform === 'linux') {
    childD.stdin.end(pipedData);
  }


  childD.stderr.on('data', function(data){ console.log(data); });
  childD.stdout.on('data', function(data){ console.log(data); });


 speechProcess.addListener('exit', function (code, signal) {
    if(code == null || signal != null) {
      console.log('couldnt talk, had an error ' + '[code: '+ code + '] ' + '[signal: ' + signal + ']');
    }

    if ( callback ){ callback() }
  });
}


// this stop function from a pull request on say.js (https://github.com/lakenen/say.js/blob/stop/lib/say.js)
exports.stop = function(){
  if (!speechProcess){ return; }
  speechProcess.stdin.pause();
  speechProcess.kill();
}
