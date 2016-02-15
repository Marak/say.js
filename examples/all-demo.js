#!/usr/bin/env node

'use strict';

var say = require('../');

// output some text to the console as the callback
say.speak(null, 'This is Ground Control to Major Tom', function (error) {
  if (error) {
    return console.error(error);
  }

  console.log('text to speech complete');
});
