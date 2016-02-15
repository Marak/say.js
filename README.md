<img src="https://github.com/Marak/say.js/raw/master/logo.png" />

### Installing say.js

```bash
npm install say
```

# Usage - Mac OS voices

Speed is based on the average number of words to be spoken per minute.

```javascript
var say = require('say');

// use default voice in System Preferences
say.speak('Hello!');

// no callback, fire and forget
say.speak('whats up, dog?', 'Alex', 20);

// output some text to the console as the callback
say.speak('whats up, dog?', 'Good News', undefined, function(error) {
  if (error) {
    return console.log(error);
  }

  console.log('text to speech complete');
});
```

# Usage - Windows

Voice parameter is not yet available. Used whatever default system voice is set, ignoring voice parameter.
Speed parameter is not yet available.

# Usage - Linux

Linux support involves the use of [Festival](http://www.cstr.ed.ac.uk/projects/festival/), which uses decidedly less friendly names for its voices.  Voices for
Festival sometimes need to be installed separately - you can check which voices are available by starting up Festival in interactive mode, typing `(voice_`,
and pressing `TAB`.  Then take the name of the voice you'd like to try, minus the parentheses, and pass it in to say.js.

Speed is a percent based upon the normal rate, so 50 is 50%, 120 is 120%, etc.

Try the following commad to install Festival as well as a default voice:

```shell
sudo apt-get install festival festvox-kallpc16k
```

## Available Voices on OS X

### Women

- Agnes
- Kathy
- Princess
- Vicki
- Victoria

### Men

- Albert
- Alex
- Bruce
- Fred
- Junior
- Ralph

### Others

- Bad News
- Bahh
- Bells
- Boing
- Bubbles
- Cellos
- Deranged
- Good News
- Hysterical
- Pipe Organ
- Trinoids
- Whisper
- Zarvox

### Requirements

* Mac OS (comes with `say`)
* Linux with Festival installed
* Windows (comes with SAPI.SpVoice)
