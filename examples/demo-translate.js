/* 
  check out the translate.js project for more information
  http://github.com/marak/translate.js/

  requires installing the translate.js module via
  
  sudo npm install translate

*/

var say = require('../lib/say');
var translate = require('translate');

translate.text('Yo quero tacos por favor', function(result){
  say.speak('Alex', result);
});
