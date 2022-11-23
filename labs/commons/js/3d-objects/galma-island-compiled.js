'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
*
* @class GalmaIsland
* ------------------
*
* */

var GalmaIsland = (function (_Island) {
    _inherits(GalmaIsland, _Island);

    function GalmaIsland(params) {
        _classCallCheck(this, GalmaIsland);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GalmaIsland).call(this, params));

        var that = _this;

        //----------------------------------

        _this.platform = null;
        _this.loader.load('assets/models/platform3.dae', function (collada) {
            collada.scene.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    that.platform = new THREE.Mesh(child.geometry, Materials.m4);
                    that.platform.position.set(0, -150, 0);
                    that.platform.scale.set(60, 200, 60);
                    that.container.add(that.platform);
                }
            });
        });

        //----------------------------------

        _this.jesus = null;
        _this.loader.load('assets/models/jesus.dae', function (collada) {
            collada.scene.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    that.jesus = new THREE.Mesh(child.geometry, Materials.m3);
                    that.jesus.position.set(0, 100, 0);
                    that.jesus.scale.set(30, 20, 30);
                    that.container.add(that.jesus);
                }
            });
        });

        //--------------------------------------------------

        _this.galma = new GlassCanvas(new THREE.ImageUtils.loadTexture('assets/img/galmasani.png'), 150);
        _this.galma.mesh.position.set(0, 50, 0);
        _this.galma.mesh.scale.set(0.4, 0.4, 0.4);
        _this.galma.mesh.rotation.set(0, 40, 0);
        _this.container.add(_this.galma.mesh);

        //--------------------------------------------------

        _this.magma = new THREE.Mesh(new THREE.IcosahedronGeometry(50, 5), Materials.m0);
        _this.magma.position.y = 110;
        _this.container.add(_this.magma);
        return _this;
    }

    _createClass(GalmaIsland, [{
        key: 'render',
        value: function render(t) {
            _get(Object.getPrototypeOf(GalmaIsland.prototype), 'render', this).call(this, t);

            //--------------------------------------------------

            this.magma.scale.x = SoundGrabber.getFFT()[0] + 1;
            this.magma.scale.y = SoundGrabber.getFFT()[1] + 1;
            this.magma.scale.z = SoundGrabber.getFFT()[2] + 1;
        }
    }]);

    return GalmaIsland;
})(Island);

//# sourceMappingURL=galma-island-compiled.js.map