// ABALONA

var mapHeight = THREE.ImageUtils.loadTexture('img/0_bump.png');
mapHeight.anisotropy = 4;
//mapHeight.repeat.set( 0.998, 0.998 );
//mapHeight.offset.set( 0.001, 0.001 );
mapHeight.wrapS = mapHeight.wrapT = THREE.RepeatWrapping;
mapHeight.format = THREE.RGBFormat;

var mapNormal = THREE.ImageUtils.loadTexture('img/0_normal.png');
mapNormal.anisotropy = 4;
//mapNormal.repeat.set( 0.998, 0.998 );
//mapNormal.offset.set( 0.001, 0.001 );
mapNormal.wrapS = mapNormal.wrapT = THREE.RepeatWrapping;
mapNormal.format = THREE.RGBFormat;

var plane = null;
var texture = new THREE.ImageUtils.loadTexture('img/0.png', undefined, function(e){

    texture.minFilter = THREE.NearestFilter;
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2);

    var material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: texture
        //bumpMap: mapHeight,
        //normalMap: mapNormal
    });

    var geometry = new THREE.SphereGeometry(150, 1, 32);

    plane = new THREE.Mesh(geometry, material);
    plane.rotation.set(1.6, 0, 3.4);

    scene.add(plane);
});