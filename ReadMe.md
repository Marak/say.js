<img src = "http://i.imgur.com/Zi6jX.png" border = "0"/>

# usage

        var say = require('./say');
        say.speak('sup dog?');
        
        // set a custom voice
        say.voice('Princess');
        say.speak('hello there!');

        var translate = require('./translate');

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

### Requirements

Mac OS