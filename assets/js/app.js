(function(){

  var nX = 1;
  var nY = 1;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.z = 40;

  var renderer = new THREE.WebGLRenderer({alpha: true});
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById('three').appendChild( renderer.domElement );

  var texture = new THREE.TextureLoader().load( "assets/textures/1.png" );
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set( 4, 4 );

  var material = new THREE.MeshBasicMaterial( { color: 0xffffff, map: texture, side:THREE.DoubleSide } );

  // geometry = new THREE.CircleGeometry( 20, 32 );
  // var circle = new THREE.Mesh( geometry, material );
  // //circle.position.set({x: -0.1, y: -0.1, z: 0});
  // scene.add( circle );

  geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
  var torusKnot = new THREE.Mesh( geometry, material );
  scene.add( torusKnot );

  var slicesOfTheFuture = new THREE.Group();
  //slicesOfTheFuture.add( circle );
  slicesOfTheFuture.add( torusKnot );
  scene.add(slicesOfTheFuture);

  // apply random rotation
  slicesOfTheFuture.rotation.set(Math.random()*360, Math.random()*360, Math.random()*360);

  // set random quaternion for slerp
  var rQ = new THREE.Quaternion();
  var euler = new THREE.Euler(Math.random()*360, Math.random()*360, Math.random()*360);
  rQ.setFromEuler(euler);

  var goSlerp = false;
  $('.navlink').on('mouseover', function(e){
    euler.set(Math.random()*360, Math.random()*360, Math.random()*360);
    rQ.setFromEuler(euler);
    goSlerp = true;
  });
  $('.navlink').on('mouseout', function(e){
    goSlerp = false;
  });
  $('.navlink').on('click', function(e){
    e.preventDefault();
  });

  let offsetX = 0;

  function animate(){
  	requestAnimationFrame(animate);
    //-------------------------------

  	renderer.render(scene, camera);

    if(goSlerp)
      slicesOfTheFuture.quaternion.slerp(rQ, 0.1);

      offsetX+=0.002;
      texture.offset.set(offsetX, 0);

    slicesOfTheFuture.rotation.x += 0.002 * nY;
    slicesOfTheFuture.rotation.y += 0.001 * nX;
  }
  animate();

  window.addEventListener('mousemove', function(e){
      nX = (e.pageX / (window.innerWidth / 2)) - 1;
      nY = (e.pageY / (window.innerHeight / 2)) - 1;
  });

})();
