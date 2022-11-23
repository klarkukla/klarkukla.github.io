window.addEventListener('load', function(){
  var index = Math.floor(Math.random()*2);
  window['App'+index].init();
});
