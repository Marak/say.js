<img src="https://github.com/Marak/say.js/raw/master/logo.png" />


## Installing say.js

```bash
npm install say
```


## Usage

```javascript
var say = require('say');

// Use default system voice and speed
say.speak('Hello!');

// Stop the text currently being spoken
say.stop();

// More complex example (with an OS X voice) and slow speed
say.speak('whats up, dog?', 'Alex', 0.5);

// Fire a callback once the text has completed being spoken
say.speak('whats up, dog?', 'Good News', 1.0, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('Text has been spoken.');
});

// Export spoken audio to a WAV file
say.export("I'm sorry, Dave.", 'Cellos', 0.75, 'hal.wav', function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('Text has been saved to hal.wav.');
});
```


## OS X Notes

### Feminine Voices

Agnes, Kathy, Princess, Vicki, Victoria

### Masculine Voices

Albert, Alex, Bruce, Fred, Junior, Ralph

### Miscellaneous Voices

Bad News, Bahh, Bells, Boing, Bubbles, Cellos, Deranged, Good News, Hysterical, Pipe Organ, Trinoids, Whisper, Zarvox


## Windows Notes

Voice parameter is not yet available. Uses whatever default system voice is set, ignoring voice parameter.
Speed parameter is not yet available.

The `export` method is not available.


## Linux Notes

Linux support involves the use of [Festival](http://www.cstr.ed.ac.uk/projects/festival/), which uses decidedly less friendly names for its voices.  Voices for
Festival sometimes need to be installed separately - you can check which voices are available by starting up Festival in interactive mode, typing `(voice_`,
and pressing `TAB`.  Then take the name of the voice you'd like to try, minus the parentheses, and pass it in to say.js.

The `export` method is not yet available.

Try the following commad to install Festival as well as a default voice:

```shell
sudo apt-get install festival festvox-kallpc16k
```


## Requirements

* Mac OS X (comes with `say`)
* Linux with Festival installed
* Windows (comes with SAPI.SpVoice)
