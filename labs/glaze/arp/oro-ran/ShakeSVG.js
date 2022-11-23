(function(){

    var two = new Two({
        type: Two.Types.svg,
        fullscreen: true,
        autostart: true
    }).appendTo(document.getElementById('logo'));

    var el = document.getElementById('svg');
    var shape = two.interpret(el).center();
    shape.fill = '#FFB8B5';
    shape.noStroke();
    shape.translation.set(two.width / 2, two.height / 2);
    shape.scale = 2;
    _.each(shape.children, function(child) {
        _.each(child.vertices, function(v) {
            v.ox = v.x;
            v.oy = v.y;
        });
    });

    two.bind('update', function() {
        _.each(shape.children, function(child) {
            _.each(child.vertices, function(v) {
                var x = v.ox + Math.random() * 2;
                var y = v.oy + Math.random() * 2;
                v.set(x, y);
            });
        });
    });

    window.addEventListener('mousemove', function(e){

        var nX = Math.abs((e.pageX / (window.innerWidth / 2)) - 1);
        var nY = Math.abs((e.pageY / (window.innerHeight / 2)) - 1);
        var v = (nX + nY) / 2;

        shape.scale = v + 2;
    });

})();