/**
*
tlhoest@gmail.com - 2017
------------------------
*
**/

var SpectralPlayer = (function(){

    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    var audioContext = new AudioContext();
    var source = null;
    var audio;
    var analyser = null;

    var bufferLength = null;
    var dataArray = [];
    var FFT = [];

    //-------------------------------------

    return {

      initialize: function(audioPath){

        audio = new Audio(audioPath);
        audio.play();
        audio.loop = true;

        analyser = audioContext.createAnalyser();
        source = audioContext.createMediaElementSource(audio);

        source.connect(analyser);
        analyser.connect(audioContext.destination);

        bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
      },

      getFFT: function(){
          if(analyser != null){
              analyser.getByteFrequencyData(dataArray);
              for(var i = 0; i < bufferLength; ++i){
                  FFT[i] = dataArray[i] / 255;
              }
          }
          return FFT;
      }
    };

})();
