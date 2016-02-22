#!/usr/bin/env node

'use strict';

var say = require('../');

var text = 'This is Ground Control to Major Tom This is Ground Control to Major Tom This is Ground Control to Major Tom';
var voice = undefined;
var speed = 2.0;

// output some text to the console as the callback
say.speak(text, voice, speed, function(error) {
  if (error) {
    // This fires when say.stop fires. Not sure if that's a good or bad thing...
    return console.error('Error speaking!', error);
  }

  console.log('text to speech complete');
});

setTimeout(function() {
  console.log('prematurely killing speech');

  say.stop(function(err) {
    if (err) {
      return console.error('unable to stop speech', err);
    }

    console.log('stopped');
  });
}, 1000);
