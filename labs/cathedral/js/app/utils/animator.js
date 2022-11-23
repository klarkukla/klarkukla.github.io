"use strict";

if (!navigator.cancelAnimationFrame)
    navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;
if (!navigator.requestAnimationFrame)
    navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;

var Animator = (function(){
    var s = Date.now();
    return{
        render: function(callback){
            requestAnimationFrame(function animate(){
                var t = Date.now() - s;
                callback(t);
                requestAnimationFrame(animate);
            });
        }
    };
})();