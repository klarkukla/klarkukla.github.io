'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
*
* @class ManoyamiIsland
* ---------------------
*
* */

var ManoyamiIsland = (function (_Island) {
    _inherits(ManoyamiIsland, _Island);

    function ManoyamiIsland(params) {
        _classCallCheck(this, ManoyamiIsland);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ManoyamiIsland).call(this, params));

        var that = _this;

        //----------------------------------

        _this.platform = null;
        _this.loader.load('assets/models/platform1.dae', function (collada) {
            collada.scene.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    var geometry = child.geometry;
                    Morpheus.generateMorphTargets(geometry);
                    that.platform = new THREE.Mesh(geometry, Materials.m3);
                    that.platform.scale.set(30, 10, 30);
                    that.container.add(that.platform);
                }
            });
        });

        //--------------------------------------------------

        _this.mano = null;
        _this.loader.load('assets/models/mano.dae', function (collada) {
            collada.scene.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    that.mano = new THREE.Mesh(child.geometry, Materials.m0);
                    that.mano.position.set(20, 60, 0);
                    that.mano.scale.set(0.2, 0.2, 0.2);
                    that.mano.rotation.x = Math.PI;
                    that.container.add(that.mano);
                }
            });
        });

        //--------------------------------------------------

        _this.yami = null;
        _this.loader.load('assets/models/yami.dae', function (collada) {
            collada.scene.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    that.yami = new THREE.Mesh(child.geometry, Materials.m1);
                    that.yami.position.set(0, 60, 0);
                    that.yami.scale.x = that.yami.scale.y = that.yami.scale.z = 0.2;
                    that.container.add(that.yami);
                }
            });
        });
        return _this;
    }

    _createClass(ManoyamiIsland, [{
        key: 'render',
        value: function render(t) {
            _get(Object.getPrototypeOf(ManoyamiIsland.prototype), 'render', this).call(this, t);

            //--------------------------------------------------

            if (this.platform !== null) {
                this.platform.morphTargetInfluences[0] = SoundGrabber.getFFT()[0];
            }

            //--------------------------------------------------

            if (this.mano !== null) {
                //this.mano.rotation.y += 0.008;
            }
        }
    }]);

    return ManoyamiIsland;
})(Island);

//# sourceMappingURL=manoyami-island-compiled.js.map