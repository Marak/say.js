var sys = require('sys')
  , fs = require('fs')
  , http = require('http')
  , exec = require('child_process').exec
  , spawn = require('child_process').spawn
  , child;

var say = exports;

// alex is the default person
var person = 'Alex';

// http client for accessing google api
var googleTranslate = http.createClient(80, 'ajax.googleapis.com');

// simple fn to get the path given text to translate
var getEnglishTranslatePath = function (text) {
  return ['/ajax/services/language/translate?v=1.0&q='
            ,encodeURIComponent(text)
            ,'&langpair=%7Cen'].join("");
}

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

// say stuff you can understand
exports.speakENGLISHmofo = function (text) {
  var req = googleTranslate.request('GET', getEnglishTranslatePath(text),
    {'host': 'ajax.googleapis.com', 'encoding':'utf-8'});
    
  req.addListener('response', function (response) {
    var responseBody = "";
    
    response.addListener('data', function (chunk) {
      responseBody += chunk;
    });
    
    response.addListener('end', function () {
      var bodyObj = JSON.parse(responseBody);
      if (bodyObj.responseStatus === 200) {
        exports.speak(bodyObj.responseData.translatedText);
      } else {
        sys.debug("Translate API call failed");
      }
    });
  });
  
  req.end();
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