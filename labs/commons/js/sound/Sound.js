/**
* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
* Thomas Lhoest - tlhoest@gmail.com - 2014
* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/

define(function () {

    var m = function (buffer, context) {

        this.source = context.createBufferSource();
        this.source.buffer = buffer;

        this.volume = context.createGain();
        this.source.connect(this.volume);

        this.panner = context.createPanner();
        this.volume.connect(this.panner);

        this.panner.connect(context.destination);
    };

    m.prototype.play = function(time, loop) {
        if (!this.source.start) {
            this.source.start = source.noteOn;
        }
        this.source.start(time);
        if (loop) {
            this.source.loop = true;
        }
    };

    m.prototype.setVolume = function (gain) {
        this.volume.gain.value = gain;
    };

    return m;
});