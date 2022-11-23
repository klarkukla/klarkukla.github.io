'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
*
* @class SpartlexIsland
* ---------------------
*
* */

var SpartlexIsland = (function (_Island) {
    _inherits(SpartlexIsland, _Island);

    function SpartlexIsland(params) {
        _classCallCheck(this, SpartlexIsland);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SpartlexIsland).call(this, params));

        var that = _this;

        //----------------------------------

        _this.platform = null;
        _this.loader.load('assets/models/platform0.dae', function (collada) {
            collada.scene.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    var geometry = child.geometry;
                    Morpheus.generateMorphTargets(geometry);
                    that.platform = new THREE.Mesh(geometry, Materials.m3);
                    that.platform.scale.x = that.platform.scale.y = that.platform.scale.z = 60;
                    that.container.add(that.platform);
                }
            });
        });

        //----------------------------------

        _this.spartan = null;
        _this.loader.load('assets/models/spartan.dae', function (collada) {
            collada.scene.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    that.spartan = new THREE.Mesh(child.geometry, Materials.m0);
                    that.spartan.scale.x = that.spartan.scale.y = that.spartan.scale.z = 2;
                    that.spartan.position.y = 100;
                    that.container.add(that.spartan);
                }
            });
        });

        //----------------------------------

        _this.tree = null;
        _this.loader.load('assets/models/tree.dae', function (collada) {
            collada.scene.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    that.tree = new THREE.Mesh(child.geometry, Materials.m4);
                    that.tree.scale.x = that.tree.scale.y = that.tree.scale.z = 10;
                    that.tree.rotation.x = Math.PI / 2;
                    that.tree.material.needsUpdate = true;
                    that.container.add(that.tree);
                }
            });
        });

        //----------------------------------

        _this.waves = new THREE.Mesh(new THREE.PlaneGeometry(100, 100, 40, 40), Materials.m1);
        _this.waves.rotation.x = 90;
        _this.container.add(_this.waves);

        //----------------------------------

        var hook = new Hook(Materials.m5);
        _this.container.add(hook.mesh);
        return _this;
    }

    _createClass(SpartlexIsland, [{
        key: 'render',
        value: function render(t) {
            _get(Object.getPrototypeOf(SpartlexIsland.prototype), 'render', this).call(this, t);

            //----------------------------------

            if (this.platform !== null) {
                this.platform.morphTargetInfluences[0] = (1 + Math.sin(t * 0.001)) / 8;
            }

            //----------------------------------

            if (this.tree !== null) {
                if (SoundGrabber.getFFT()[0] !== undefined) {
                    this.tree.material.map.offset.x += SoundGrabber.getFFT()[25] * 0.02;
                }
            }
        }
    }]);

    return SpartlexIsland;
})(Island);

//# sourceMappingURL=spartlex-island-compiled.js.map