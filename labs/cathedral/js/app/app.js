//------------------------------------------

//const socket = io.connect('http://localhost:8080');
//OSCGrabber.listen(socket);

//------------------------------------------

var midiGrabber = new MIDIGrabber();

//------------------------------------------

var fuzzyShades = new FuzzyShades({
    scene: World.scene,
    camera: World.camera,
    renderer: World.renderer
});

//------------------------------------------

var gui = new GUI(fuzzyShades);

//------------------------------------------

//SoundGrabber.createMeter();

//------------------------------------------

Animator.render(function(t){

    Materials.render(t);

    //------------------------------------------

    Scene.render(t);

    //------------------------------------------

    fuzzyShades.render();

    //------------------------------------------

    //SoundGrabber.drawMeter();
});
