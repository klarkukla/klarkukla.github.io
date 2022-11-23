var Scene = (function(){

    var self = this;

    //--------------------------------------------------

    /*var skybox = new THREE.Mesh(new THREE.SphereGeometry(World.sceneSize / 2, 60, 40), Materials.m2);
    skybox.scale.set(-1, 1, 1);
    World.scene.add(skybox);*/

    //-------------------------------------------

    //var rain = new Rain(World.sceneSize/2);
    //World.scene.add(rain.mesh);

    //--------------------------------------------------
    // clusters

    /*
    var spartlexCluster = new SpartlexCluster({
        rotation: 0.001
    });
    spartlexCluster.mesh.position.set(50, 0, 351);
    World.scene.add(spartlexCluster.mesh);

    //--------------------------------------------------

    var mayonamiCluster = new ManoyamiCluster({
        rotation: 0.0008
    });
    mayonamiCluster.mesh.position.set(200, 0, -50);
    World.scene.add(mayonamiCluster.mesh);

    //--------------------------------------------------

    var galmaCluster = new GalmaCluster({
        rotation: 0.005
    });
    galmaCluster.mesh.position.set(-180, 0, 320);
    World.scene.add(galmaCluster.mesh);

    //--------------------------------------------------

    var otomonCluster = new OtomonCluster({
        rotation: 0.008
    });
    otomonCluster.mesh.position.set(180, 0, 0);
    World.scene.add(otomonCluster.mesh);
    */

    //--------------------------------------------------
    // archi

    var cathedral = null;
    Loader.objLoader.load('assets/models/archi/cathedral.obj', function(object){
        object.traverse(function(child){
            if(child instanceof THREE.Mesh){
                cathedral = child;
                cathedral.material = Materials.m7;
                cathedral.position.set(0, 0, 0);
                cathedral.scale.set(50, 50, 50);
                World.scene.add(cathedral);
            }
        });
    });

    //--------------------------------------------------

    return{

        render: function(t){

            World.gamepadControls.render();

            //--------------------------------------------------

            //spartlexCluster.render(t);
            //mayonamiCluster.render(t);
            //galmaCluster.render(t);
            //otomonCluster.render(t);

            //--------------------------------------------------

            //rain.render();

            //--------------------------------------------------

            if(midiGrabber.message.note == 55){
                //rain.mesh.scale.x = (midiGrabber.message.velocity / 10) + 1;
            }
        }
    }
})();
