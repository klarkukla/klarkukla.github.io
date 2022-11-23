'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
*
* @class OtomonIsland
* -------------------
*
* */

var OtomonIsland = (function (_Island) {
        _inherits(OtomonIsland, _Island);

        function OtomonIsland(params) {
                _classCallCheck(this, OtomonIsland);

                var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(OtomonIsland).call(this, params));

                var that = _this;

                //----------------------------------

                _this.platform = null;
                _this.loader.load('assets/models/platform2.dae', function (collada) {
                        collada.scene.traverse(function (child) {
                                if (child instanceof THREE.Mesh) {
                                        that.platform = new THREE.Mesh(child.geometry, Materials.m4);
                                        that.platform.scale.set(60, 30, 60);
                                        that.container.add(that.platform);
                                }
                        });
                });

                //--------------------------------------------------

                _this.otomon = new GlassCanvas(new THREE.ImageUtils.loadTexture('assets/img/otomon.png'), 150);
                _this.otomon.mesh.position.set(0, 50, 0);
                _this.otomon.mesh.scale.set(0.4, 0.4, 0.4);
                _this.otomon.mesh.rotation.set(0, 40, 0);
                _this.container.add(_this.otomon.mesh);

                //--------------------------------------------------

                _this.cccc = new CCCC(Materials.m1);
                _this.cccc.mesh.position.set(0, 100, 0);
                _this.cccc.mesh.scale.set(0.1, 0.1, 0.1);
                _this.container.add(_this.cccc.mesh);
                return _this;
        }

        _createClass(OtomonIsland, [{
                key: 'render',
                value: function render(t) {
                        _get(Object.getPrototypeOf(OtomonIsland.prototype), 'render', this).call(this, t);

                        //--------------------------------------------------

                        this.cccc.render();
                        this.cccc.mesh.scale.x = SoundGrabber.getFFT()[0] + 0.5;
                        this.cccc.mesh.scale.y = SoundGrabber.getFFT()[500] + 0.5;
                        this.cccc.mesh.scale.z = SoundGrabber.getFFT()[800] + 0.5;
                }
        }]);

        return OtomonIsland;
})(Island);

//# sourceMappingURL=otomon-island-compiled.js.map