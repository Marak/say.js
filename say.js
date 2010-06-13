var sys = require('sys')
  , fs = require('fs')
  , http = require('http')
  , exec = require('child_process').exec
  , spawn = require('child_process').spawn
  , child;

var colors = require('./colors'); // import color.js for fun!

var say = exports;

// alex is the default person
var person = 'Alex';

// assign a voice to say
exports.voice = function(p){
  person = p;
};

// say stuff, speak
exports.speak = function(text){
  var commands = [ '-v', person, text];
  var childD = spawn("say", commands);
  childD.stdout.setEncoding('ascii');
  childD.stderr.setEncoding('ascii');  
  childD.stderr.addListener('data', function(data){});
  childD.stdout.addListener('data', function(data){});
  childD.addListener('exit', function (code, signal) {
    if(code == null || signal != null) {
      sys.puts('couldnt talk, had an error ' + '[code: '+ code + '] ' + '[signal: ' + signal + ']');
    }
  });
}

/*
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