/**
* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
* Thomas Lhoest - tlhoest@gmail.com - 2014
* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/

define(['three'], function (THREE) {

    var o = function (sound, centroid, radius) {

        this.centroid = centroid;
        this.radius = radius;

        this.sound = sound;
        this.sound.play(0, true);
        //this.sound.setVolume(0);

        this.sound.panner.setPosition(this.centroid.x, this.centroid.y, this.centroid.z);

        this.sound.panner.distanceModel = "linear";
        this.sound.panner.refDistance = 0;
        this.sound.panner.rolloffFactor = 1;
        this.sound.panner.maxDistance = radius;
    };

    o.prototype.draw = function (scene, color) {
        var geometry = new THREE.SphereGeometry(this.radius, 12, 12);
        var material = new THREE.MeshBasicMaterial({color: color, wireframe: true});
        var sphere = new THREE.Mesh(geometry, material);
        sphere.position.x = this.centroid.x;
        sphere.position.z = this.centroid.z;
        scene.add(sphere);
    };

    return o;
});