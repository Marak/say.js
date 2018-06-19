<img src="https://github.com/Marak/say.js/raw/master/logo.png" />


## Installing say.js

```bash
npm install say
```


## Usage

```javascript
const say = require('say')

// Use default system voice and speed
say.speak('Hello!')

// Stop the text currently being spoken
say.stop()

// More complex example (with an OS X voice) and slow speed
say.speak("What's up, dog?", 'Alex', 0.5)

// Fire a callback once the text has completed being spoken
say.speak("What's up, dog?", 'Good News', 1.0, (err) => {
  if (err) {
    return console.error(err)
  }

  console.log('Text has been spoken.')
});

// Export spoken audio to a WAV file
say.export("I'm sorry, Dave.", 'Cellos', 0.75, 'hal.wav', (err) => {
  if (err) {
    return console.error(err)
  }

  console.log('Text has been saved to hal.wav.')
})
```

### Methods

#### Override Platform:

```javascript
say.setPlatform(say.platforms.WIN32 || say.platforms.MACOS || say.platforms.LINUX)
```

#### Speak:

* Speed: 1 = 100%, 0.5 = 50%, 2 = 200%, etc

```javascript
say.speak(text, voice || null, speed || null, callback || null)
```

#### Export Audio:

* MacOS Only
* Speed: 1 = 100%, 0.5 = 50%, 2 = 200%, etc

```javascript
say.export(text, voice || null, speed || null, filename, callback || null)
```

#### Stop Speaking:

```javascript
say.stop(callback || null)
```

#### Get List of Installed Voice(s):

```javascript
say.getInstalledVoices(callback)
```

## Feature Matrix

Unfortunately every feature isn't supported on every platform. PR's welcome!

Platform | Speak | Export | Stop | Speed | Voice | List
---------|-------|--------|------|-------|-------|-----
macOS    | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :no_entry_sign:
Linux    | :white_check_mark: | :no_entry_sign:    | :white_check_mark: | :white_check_mark: | :white_check_mark: | :no_entry_sign:
Windows  | :white_check_mark: | :no_entry_sign:    | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark:


## macOS Notes

Voices in macOS are associated with different localities. To a list of voices and their localities run the following command:

```sh
say -v "?"
```

As an example, the default voice is `Alex` and the voice used by Siri is `Samantha`.


## Windows Notes

The `.export()` method is not available.


## Linux Notes

Linux support requires [Festival](http://www.cstr.ed.ac.uk/projects/festival/), which uses less friendly names for its voices. Voices for Festival sometimes need to be installed separately. You can check which voices are available by running `festival`, typing `(voice_`, and pressing Tab. Then take the name of the voice you'd like to try, minus the parentheses, and pass it in to say.js.

The `.export()` method is not available.

Try the following commad to install Festival with a default voice:

```shell
sudo apt-get install festival festvox-kallpc16k
```


## Requirements

* Mac OS X (comes with `say`)
* Linux with Festival installed
* Windows (comes with SAPI.SpVoice)
