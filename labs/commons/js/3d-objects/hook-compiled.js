"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
*
*
*
**/

var Hook = (function () {
    function Hook(material) {
        _classCallCheck(this, Hook);

        this.material = material;
        this.container = new THREE.Object3D();

        for (var i = 0; i < 10; i++) {

            var m = new THREE.Mesh(new THREE.TorusGeometry(25, 1, 3, 3, 3), this.material);
            m.position.x = 5 * Math.sin(i);
            //this.mesh.position.z = 5 * Math.cos(i);
            m.position.y = 5 * i + 50;
            m.rotation.x = Math.PI / 2;
            //this.mesh.rotation.y = i;
            m.rotation.z = i * 0.5;

            this.container.add(m);
        }
    }

    _createClass(Hook, [{
        key: "mesh",
        get: function get() {
            return this.container;
        }
    }]);

    return Hook;
})();

//# sourceMappingURL=hook-compiled.js.map