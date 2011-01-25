var say = require('../lib/say'),
colors = require('colors'),
sys = require('sys');

// no callback, fire and forget
say.speak('Alex', 'whats up, dog?');

// no callback, fire and forget
say.speak('Cellos', 'whats up, dog?');

// output some text to the console as the callback
say.speak('Good News', 'whats up, dog?', function () {
  sys.puts('text to speech complete'.green);
});
