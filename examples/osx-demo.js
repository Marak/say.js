#!/usr/bin/env node

'use strict';

var say = require('../');

// no callback, fire and forget
say.speak('Alex', 'whats up, dog?');

// no callback, fire and forget
say.speak('Cellos', 'whats up, dog?');

// output some text to the console as the callback
say.speak('Good News', 'whats up, dog?', function (error) {
  if (error) {
    console.log(error);
  }

  console.log('text to speech complete');
});
