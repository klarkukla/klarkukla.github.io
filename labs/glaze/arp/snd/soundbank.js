var SoundBank = (function(){

  var sndz = [
    "arp/snd/1.wav",
    "arp/snd/2.wav",
    "arp/snd/3.wav",
    "arp/snd/4.wav",
    "arp/snd/5.wav",
    "arp/snd/6.wav",
    "arp/snd/7.wav"
  ];

  return{
    getRandom: function(){
      var index = Math.floor(Math.random()*sndz.length);
      return sndz[index];
    }
  }


})();
