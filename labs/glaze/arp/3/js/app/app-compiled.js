"use strict";

//------------------------------------------

var shades = new FuzzyShades({
    scene: World.scene,
    camera: World.camera,
    renderer: World.renderer
});

//------------------------------------------

//SoundGrabber.createMeter();

//------------------------------------------

Animator.render(function (t) {

    Materials.render(t);

    //------------------------------------------

    Scene.render(t);

    //------------------------------------------

    shades.render();

    //------------------------------------------

    //SoundGrabber.drawMeter();
});

//# sourceMappingURL=app-compiled.js.map