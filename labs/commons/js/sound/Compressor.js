/**
* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
* Thomas Lhoest - tlhoest@gmail.com - 2014
* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/
define(function () {
    return function (context, mix) {
        var compressor = context.createDynamicsCompressor();
        mix.connect(compressor);
        compressor.connect(context.destination);
    };
});