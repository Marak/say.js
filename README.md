<img src = "https://github.com/Marak/say.js/raw/master/logo.png"/>

### Installing say.js

```bash
npm install say
```

# usage - Mac OS voices

```javascript
var say = require('say');

// no callback, fire and forget
// note it has no error handling
say.speak('Alex', 'whats up, dog?');

// use default voice in System Preferences
say.speak(null, 'Hello!');

// no callback, fire and forget
say.speak('Cellos', 'whats up, dog?');

// output some text to the console as the callback
say.speak('Good News', 'whats up, dog?', function (error) {
    if (error) {
        console.log(error);
    }

    console.log('text to speech complete');
});


// try using translate.js with say.js
var translate = require('translate');

translate.text('Yo quero tacos por favor', function(result){
    say.speak('Alex', result);
});
```

# Usage - Windows
Voice selection is not available yet. The first argument to `speak` will be totally ignored and text will be spoken with the system's default voice.


# Usage - Linux

Linux support involves the use of [Festival](http://www.cstr.ed.ac.uk/projects/festival/), which uses decidedly less friendly names for its voices.  Voices for
Festival sometimes need to be installed separately - you can check which voices are available by starting up Festival in interactive mode, typing `(voice_`,
and pressing `TAB`.  Then take the name of the voice you'd like to try, minus the parentheses, and pass it in to say.js.

Try the following commad to install Festival as well as a default voice:

```shell
sudo apt-get install festival festvox-kallpc16k
```

## voices
### girls
- Agnes
- Kathy
- Princess
- Vicki
- Victoria

### guys
- Albert
- Alex
- Bruce
- Fred
- Junior
- Ralph

### others
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

Mac OS (comes with `say`) or Linux with Festival
