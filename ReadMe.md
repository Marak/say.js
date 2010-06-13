<img src = "http://i.imgur.com/Zi6jX.png" border = "0"/>

# usage

        var say = require('./say');
        say.speak('sup dog?');
        
        // set a custom voice
        say.voice('Princess');
        say.speak('hello there!');

        translate.output('English');
        translate.input('Spanish');

        translate.text('Yo quero tacos por favor', function(result){
          say.speak(result);
        })



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

say.speak calls are asynchronous, lol ^_^

## translation provided by <a href = "http://github.com/marak/translate.js">translate.js</a>

## languages

<table><tbody><tr><td style="white-space: nowrap;">Afrikaans<br>Albanian<br>Arabic<br>Armenian<br>Azerbaijani<br>Basque<br>Belarusian<br>Bulgarian<br>Catalan<br>Chinese</td><td style="white-space: nowrap;">Croatian<br>Czech<br>Danish<br>Dutch<br>English<br>Estonian<br>Filipino<br>Finnish<br>French<br>Galician</td><td style="white-space: nowrap;">Georgian<br>German<br>Greek<br>Haitian Creole<br>Hebrew<br>Hindi<br>Hungarian<br>Icelandic<br>Indonesian<br>Irish</td><td style="white-space: nowrap;">Italian<br>Japanese<br>Korean<br>Latvian<br>Lithuanian<br>Macedonian<br>Malay<br>Maltese<br>Norwegian<br>Persian</td><td style="white-space: nowrap;">Polish<br>Portuguese<br>Romanian<br>Russian<br>Serbian<br>Slovak<br>Slovenian<br>Spanish<br>Swahili<br>Swedish</td><td style="white-space: nowrap;">Thai<br>Turkish<br>Ukrainian<br>Urdu<br>Vietnamese<br>Welsh<br>Yiddish</td></tr></tbody></table>

### Requirements

Mac OS

