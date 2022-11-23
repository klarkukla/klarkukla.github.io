class Sound {

    constructor(buffer, context) {
        this.buffer = buffer;
        this.context = context;
    }
  
    play(volume, pan, loop) {
        let source = this.context.createBufferSource();
        source.buffer = this.buffer;

        //

        if(loop)
            source.loop = true;

        //

        source.connect(this.context.destination);
        source.start();
    }
}