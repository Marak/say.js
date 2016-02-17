#!/usr/bin/env node

'use strict';

var say = require('../');

// no callback, fire and forget
say.export('whats up, dog?', './output.wav', {speed: 30, voice: 'Alex'}, function (error){
  if (error) {
    return console.log(error);
  }

  console.log('export complete');
});
