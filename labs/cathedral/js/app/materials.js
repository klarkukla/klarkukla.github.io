var Materials = (function(){

    //--------------------------------------------------

    var m0 = new NoisySurface(Textures.t0);

    //--------------------------------------------------

    var m1 = new NoisySurface(Textures.t1);

    //--------------------------------------------------

    var m2 = new NoisySurface(Textures.t3);

    //--------------------------------------------------

    var m3 = new THREE.MeshPhongMaterial({
        //color: 0xfff200,
        //emissive: 0x000000,
        //specular: 0xff00ff,
        map: Textures.t2_normal,
        bumpMap: Textures.t2_bump,
        normalMap: Textures.t2,
        specularMap: Textures.t4_bump,
        shininess: 170,
        side: THREE.DoubleSide,
        transparent: false,
        opacity: 0.9
    });

    //--------------------------------------------------

    var m4 = new THREE.MeshBasicMaterial({
        map: Textures.t3,
        side: THREE.DoubleSide
    });

    //--------------------------------------------------

    var m5 = new ColorFluids(1, 1);

    //--------------------------------------------------

    var m6 = new THREE.MeshBasicMaterial({
        map: Textures.t1,
        side: THREE.DoubleSide
    });

    //--------------------------------------------------

    var m7 = new THREE.MeshPhongMaterial({
        color: 0xfff762,
        //emissive: 0x0a0025,
        //specular: 0xff00ff,
        map: Textures.t4_normal,
        bumpMap: Textures.t4_bump,
        normalMap: Textures.t4,
        specularMap: Textures.t2_bump,
        shininess: 170,
        side: THREE.DoubleSide,
        transparent: false,
        opacity: 0.9
    });

    return{

        m0: m0,
        m1: m1,
        m2: m2,
        m3: m3,
        m4: m4,
        m5: m5,
        m6: m6,
        m7: m7,

        render: function(t){
            if(SoundGrabber.getFFT()[0] !== undefined){

                m0.uniforms['time'].value = t * 0.00005 + (SoundGrabber.getFFT()[0]/5);
                m1.uniforms['time'].value = t * 0.00002 * (SoundGrabber.getFFT()[100]/5);
                m2.uniforms['time'].value = t * 0.00005 * (SoundGrabber.getFFT()[150]/5);

                m4.map.offset.x += SoundGrabber.getFFT()[0] * 0.02;
                m3.map.offset.x += SoundGrabber.getFFT()[5] * 0.02;
                m3.map.offset.y -= SoundGrabber.getFFT()[10] * 0.02;
                m6.map.offset.x += SoundGrabber.getFFT()[5] * 0.02;
                m7.map.offset.x += SoundGrabber.getFFT()[10] * 0.02;

                m5.uniforms['time'].value += SoundGrabber.getFFT()[50];
                m5.uniforms['resolution'].value.x = SoundGrabber.getFFT()[50] + 1;
                m5.uniforms['resolution'].value.y = SoundGrabber.getFFT()[100] + 1;

            }
        }
    }
})();