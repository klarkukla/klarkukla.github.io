/**
*
tlhoest@gmail.com - 2016
------------------------
*
**/

var SoundGrabber = (function(){

    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    if(!navigator.getUserMedia)
        navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    var audioContext = new AudioContext();
    var audioInput = null;
    var realAudioInput = null;
    var inputPoint = null;
    var analyserContext = null;
    var analyser = null;
    var zeroGain = null;
    var bufferLength = null;
    var dataArray = [];
    var FFT = [];

    var meterWidth = 400;
    var meterHeight = 200;
    var meterCtx = null;

    function gotStream(stream){

        inputPoint = audioContext.createGain();

        //

        realAudioInput = audioContext.createMediaStreamSource(stream);
        audioInput = realAudioInput;
        audioInput.connect(inputPoint);

        //

        analyser = audioContext.createAnalyser();
        //analyser.fftSize = 2048;
        inputPoint.connect(analyser);

        //

        bufferLength = analyser.frequencyBinCount;

        //

        dataArray = new Uint8Array(bufferLength);

        //

        zeroGain = audioContext.createGain();
        zeroGain.gain.value = 0.0;
        inputPoint.connect(zeroGain);
        zeroGain.connect(audioContext.destination);
    }

    navigator.getUserMedia({
        "audio": {
            "mandatory": {
                "googEchoCancellation": "false",
                "googAutoGainControl": "false",
                "googNoiseSuppression": "false",
                "googHighpassFilter": "false"
            },
            "optional": []
        }
    }, 
    gotStream,
    function(e){
        alert('Error getting audio');
        console.log(e);
    });

    //-------------------------------------

    return{

        getFFT: function(){
            if(analyser != null){
                analyser.getByteFrequencyData(dataArray);
                for(var i = 0; i < bufferLength; ++i){
                    FFT[i] = dataArray[i] / 255;
                }
            }
            return FFT;
        },

        createMeter: function(){
            var meter = document.createElement('canvas');
            meter.width = meterWidth;
            meter.height = meterHeight;
            meter.style.position = 'fixed';
            meter.style.bottom = '15px';
            meter.style.right = '15px';
            meter.style.borderRadius = '2px';
            document.body.appendChild(meter);

            meterCtx = meter.getContext('2d');
            meterCtx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            meterCtx.fillRect(0, 0, meterWidth, meterHeight);
        },

        drawMeter: function(){
            if(analyser != null && meterCtx != null){
                var barWidth = (meterWidth / bufferLength) * 2.5;
                var barHeight;
                var x = 0;

                for(var i = 0; i < bufferLength; i++) {
                    barHeight = dataArray[i];

                    meterCtx.fillStyle = 'rgb(' + (barHeight + 80) + ', 80, 80)';
                    meterCtx.fillRect(x, meterHeight-barHeight/2, barWidth, barHeight/2);

                    x += barWidth + 1;
                }
            }
        }
        
    };
})();