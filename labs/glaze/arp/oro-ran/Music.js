(function(){

    var self = {};
    var src = "balamb-daraj.wav";

    var audio = T("audio", {loop:true}).load(src, function(res){
        self.reverb = T("reverb", {room:0.9, damp:0.2, mix:0.5}, this);
        self.reverb.play();

        window.addEventListener('mousemove', function(e){

            var nX = Math.abs((e.pageX / (window.innerWidth / 2)) - 1);
            var nY = Math.abs((e.pageY / (window.innerHeight / 2)) - 1);
            var v = (nX + nY) / 2;

            self.reverb.room = v;
            self.reverb.damp = v;
        });
    });
})();