<img src = "https://github.com/Marak/say.js/raw/master/logo.png"/>

### Installing say.js

```bash
npm install say
```

# usage - Mac OS voices

```javascript
var say = require('say'),

// no callback, fire and forget
say.speak('Alex', 'whats up, dog?');

// use default voice in System Preferences
say.speak(null, 'Hello!');

// no callback, fire and forget
say.speak('Cellos', 'whats up, dog?');

// output some text to the console as the callback
say.speak('Good News', 'whats up, dog?', function () {
     console.log('text to speech complete');
});


// try using translate.js with say.js
var translate = require('translate');

translate.text('Yo quero tacos por favor', function(result){
     say.speak('Alex', result);
});
```


# Usage - Linux

Linux support involves the use of [Festival](http://www.cstr.ed.ac.uk/projects/festival/), which uses decidedly less friendly names for its voices.  Voices for
Festival sometimes need to be installed separately - you can check which voices are available by starting up Festival in interactive mode, typing `(voice_`,
and pressing `TAB`.  Then take the name of the voice you'd like to try, minus the parentheses, and pass it in to say.js.

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

### fun facts

`say.speak()` calls are asynchronous, lol ^_^

## translation provided by <a href = "http://github.com/marak/translate.js">translate.js</a>

## languages

<table><tbody><tr><td style="white-space: nowrap;">Afrikaans<br>Albanian<br>Arabic<br>Armenian<br>Azerbaijani<br>Basque<br>Belarusian<br>Bulgarian<br>Catalan<br>Chinese</td><td style="white-space: nowrap;">Croatian<br>Czech<br>Danish<br>Dutch<br>English<br>Estonian<br>Filipino<br>Finnish<br>French<br>Galician</td><td style="white-space: nowrap;">Georgian<br>German<br>Greek<br>Haitian Creole<br>Hebrew<br>Hindi<br>Hungarian<br>Icelandic<br>Indonesian<br>Irish</td><td style="white-space: nowrap;">Italian<br>Japanese<br>Korean<br>Latvian<br>Lithuanian<br>Macedonian<br>Malay<br>Maltese<br>Norwegian<br>Persian</td><td style="white-space: nowrap;">Polish<br>Portuguese<br>Romanian<br>Russian<br>Serbian<br>Slovak<br>Slovenian<br>Spanish<br>Swahili<br>Swedish</td><td style="white-space: nowrap;">Thai<br>Turkish<br>Ukrainian<br>Urdu<br>Vietnamese<br>Welsh<br>Yiddish</td></tr></tbody></table>

### Requirements

Mac OS (comes with say) or Linux with Festival
