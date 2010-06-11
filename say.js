var sys = require('sys')
  , fs = require('fs')
  , exec = require('child_process').exec
  , spawn = require('child_process').spawn
  , child;

var say = exports;

// alex is the default person
var person = 'Alex';

// assign a voice to say
exports.voice = function(p){
  person = p;
};

// say stuff, speak
exports.speak = function(text){
  var commands = [text, '-v', person];
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