/**
* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
* Thomas Lhoest - tlhoest@gmail.com - 2014
* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/

define(['modules/sound/AudioZone'], function (AudioZone) {

    var _context;
    var _p = {};

    var m = function(sounds, context, scene) {

        _context = context;

        _p.sa0 = new AudioZone(sounds[0], {x:0, y:200, z:0}, 2500);
        _p.sa1 = new AudioZone(sounds[1], {x:0, y:200, z:0}, 1400);
        _p.sa2 = new AudioZone(sounds[2], {x:0, y:200, z:0}, 700);

        /*_p.sa0.draw(scene, 0x000000);
        _p.sa1.draw(scene, 0x000000);
        _p.sa2.draw(scene, 0x000000);*/
    };

    m.prototype.render = function (cameraPosition, cameraOrientation) {
        var p = cameraPosition;
        var o = cameraOrientation;
        _context.listener.setPosition(p.x, p.y, p.z);
        _context.listener.setOrientation(o.front.x, o.front.y, o.front.z, o.up.x, o.up.y, o.up.z);
    };

    return m;
});