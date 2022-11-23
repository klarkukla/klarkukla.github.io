var App1 = (function(){

  return{
    init: function(){

      var sceneSize = 4000;

      var nX = 1;
      var nY = 1;

      var objLoader = new THREE.OBJLoader();
      var loader = new THREE.TextureLoader();

      // RENDERER

      var renderer = new THREE.WebGLRenderer({antialias: true});
      renderer.setClearColor(0xc02814);
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.getElementById('three').appendChild(renderer.domElement);

      // CAM

      var camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 1, sceneSize * 2);
      camera.position.set(-30, 70, 0);

      // SCENE

      var scene = new THREE.Scene();

      // LIGHTS

      var dl = new THREE.DirectionalLight(0xc02814, 1);
    	dl.position.set(sceneSize, sceneSize, sceneSize);
    	scene.add(dl);

      // mat

      var material = new THREE.MeshLambertMaterial({
          color: 0x2194ce,
          emissive: 0xc02814
      });

      //==================================
      // SCENE


      var cathedral = null;
      objLoader.load('arp/2/assets/models/archi/cathedral.obj', function(object){
          object.traverse(function(child){
              if(child instanceof THREE.Mesh){
                  cathedral = child;
                  cathedral.material = material;
                  cathedral.scale.set(50, 50, 50);
                  scene.add(cathedral);
              }
          });
      });

      Animator.render(function(t){

        //camera.rotation.x -= nY * 0.01;
            camera.rotation.y -= nX * 0.01;

          renderer.render(scene, camera);
      });

      window.addEventListener('mousemove', function(e){
          nX = (e.pageX / (window.innerWidth / 2)) - 1;
          nY = (e.pageY / (window.innerHeight / 2)) - 1;
      });

    }
  }


})();
