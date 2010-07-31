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

var sys = require('sys')
  , colors = require('colors')
  , exec = require('child_process').exec
  , spawn = require('child_process').spawn
  , child;

var say = exports;

// say stuff, speak
exports.speak = function(voice, text, callback){
  
  if(arguments.length < 2){
    sys.puts('invalid amount of arguments sent to speak()');
    return;
  }
  
  var commands = [ '-v', voice, text];
  var childD = spawn("say", commands);
  childD.stdout.setEncoding('ascii');
  childD.stderr.setEncoding('ascii');  
  childD.stderr.addListener('data', function(data){});
  childD.stdout.addListener('data', function(data){});
  
  
  childD.addListener('exit', function (code, signal) {
    if(code == null || signal != null) {
      sys.puts('couldnt talk, had an error ' + '[code: '+ code + '] ' + '[signal: ' + signal + ']');
    }
    
    // we could do better then a try / catch here
    try{
      callback();
    }
    catch(err){
    }
  });
}

/*
    This code doesnt work....but it could!
    // monkey punch sys.puts to speak, lol
    say.puts();

    sys.puts('whats, up dog?'); // did you hear that?
    exports.puts = function(){

      var s2 = require('sys');
      // don't try this at home
      sys.puts = function(text){
        s2.puts(text);
      };
    }
*/