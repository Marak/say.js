var say = require('./say');
var translate = require('./translate');

translate.output('English');
translate.input('Spanish');

translate.text('Yo quero tacos por favor', function(result){
  say.speak(result);
})
