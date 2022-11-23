"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
*
* @class Island
* -------------
*
* */

var Island = (function () {
    function Island(params) {
        _classCallCheck(this, Island);

        this.rotation = params.rotation;
        this.loader = params.loaderInstance;
        this.container = new THREE.Object3D();
    }

    _createClass(Island, [{
        key: "render",
        value: function render(t) {
            this.container.rotation.y += this.rotation;
        }
    }, {
        key: "mesh",
        get: function get() {
            return this.container;
        }
    }]);

    return Island;
})();

//# sourceMappingURL=island-compiled.js.map