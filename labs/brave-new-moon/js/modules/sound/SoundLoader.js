/**
* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
* Thomas Lhoest - tlhoest@gmail.com - 2014
* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/

define(['modules/sound/Sound'], function (Sound) {

    var _context = new AudioContext();
    var _onLoad = null;
    var _sounds = new Array();
    var _urlList = new Array();
    var _loadCount = 0;

    var m = function (urlList, callback) {

        try {
            window.AudioContext = (
                window.AudioContext ||
                window.webkitAudioContext ||
                null
            );
        }
        catch(e) {
            throw new Error("Web Audio API is not supported in this browser");
        }

        _urlList = urlList;
        _onLoad = callback;

        for(var i = 0; i < _urlList.length; ++i)
            loadBuffer(_urlList[i], i);
    };

    /*
    * privates
    * */

    var loadBuffer = function(url, index) {

        var self = this;
        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.responseType = "arraybuffer";
        request.onload = function() {

            _context.decodeAudioData(
                request.response,
                function(buffer) {
                    if (!buffer) {
                        console.log('error decoding file data: ' + url);
                        return;
                    }

                    _sounds[index] = new Sound(buffer, _context);

                    // callback
                    if (++_loadCount == _urlList.length) {
                        _onLoad(_sounds, _context);
                    }
                },
                function(error) {
                    console.error('decodeAudioData error', error);
                }
            );
        };

        request.onerror = function() {
            alert('BufferLoader: XHR error');
        };

        request.send();
    };

    return m;
});