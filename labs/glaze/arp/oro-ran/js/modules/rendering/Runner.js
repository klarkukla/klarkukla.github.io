/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
@author Thomas Lhoest - tlhoest@gmail.com
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/

var Runner = (function () {

    var module = function() {
        var self = this;
        var time = Date.now();
        requestAnimationFrame(function animate(){
            self.draw(time);
            time = Date.now();
            requestAnimationFrame(animate);
        });
    };

    module.prototype = {
        draw: function(time) {}
    };

    return module;
})();