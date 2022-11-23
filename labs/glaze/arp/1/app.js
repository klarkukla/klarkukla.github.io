var App0 = (function(){

  return{
    init: function(){

      const speedX = speedY = 0.001;

      var mouseX = 1;
      var mouseY = 1;

      // RENDERER

      var renderer = new THREE.WebGLRenderer({antialias: true});
      renderer.setClearColor(0x000000);
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.getElementById('three').appendChild(renderer.domElement);

      // CAM

      var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 200);
      camera.position.set(0, 5, 170);
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      // SCENE

      var scene = new THREE.Scene();

      // LIGHT

      var light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(0, 1, 0);
      scene.add(light);

      //-----------------------------------------------
      // OBJ

      // height
      var mapHeight = new THREE.TextureLoader().load('arp/1/assets/textures/0_bump.png');
      mapHeight.anisotropy = 4;
      mapHeight.wrapS = mapHeight.wrapT = THREE.RepeatWrapping;
      mapHeight.format = THREE.RGBFormat;

      // normal
      var mapNormal = new THREE.TextureLoader().load('arp/1/assets/textures/0_normal.png');
      mapNormal.anisotropy = 4;
      mapNormal.wrapS = mapNormal.wrapT = THREE.RepeatWrapping;
      mapNormal.format = THREE.RGBFormat;

      // albedo
      var texture = new THREE.TextureLoader().load('arp/1/assets/textures/0.png');
      texture.minFilter = THREE.NearestFilter;
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(2, 2);

      // mat
      var material = new THREE.MeshPhongMaterial({
          map: texture,
          bumpMap: mapHeight,
          normalMap: mapNormal
      });

      // mesh
      var geometry = new THREE.SphereGeometry(150, 1, 32);

      var mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.set(1.55, 0, 0);
      mesh.material.needsUpdate = true;

      scene.add(mesh);

      //-----------------------------------------------
      // RENDER

      Animator.render(function(t){

          if(mesh !== null){
              mesh.material.map.offset.x += mouseX * speedX;
              mesh.material.map.offset.y += mouseX * speedY;
          }

          renderer.render(scene, camera);
      });

      window.addEventListener('mousemove', function(e){
          mouseX = Math.abs((e.pageX / (window.innerWidth / 2)) - 1);
          mouseY = Math.abs((e.pageY / (window.innerHeight / 2)) - 1);
      });


    }
  }


})();
