class GUI{
    constructor(shades){

        var _shades = shades;

        //---------------------------------------

        angular.module('GUI', [])
        .controller('GUIController', ['$scope', function($scope){

            $scope.effects = {};
            $scope.presetsCollection = [];

            $scope.displaySaveModal = false;
            $scope.displayPresets = false;

            $scope.newPresetName = '';
            $scope.lastPresetsLoaded = 0;

            //--------------------------------------------------

            function init(){
                if(localStorage.getItem('presetsCollection') != null){

                    if(localStorage.getItem('lastPresetsLoaded') != null){
                        $scope.lastPresetsLoaded = localStorage.getItem('lastPresetsLoaded');
                    }

                    var pc = localStorage.getItem('presetsCollection');
                    $scope.presetsCollection = JSON.parse(pc);
                    $scope.effects = $scope.presetsCollection[$scope.lastPresetsLoaded].data;

                    _shades.initEffects($scope.effects);

                } else {
                    function loadJSON(callback){
                        var xobj = new XMLHttpRequest();
                        xobj.overrideMimeType("application/json");
                        xobj.open('GET', 'presets/p0.json', true);
                        xobj.onreadystatechange = function(){
                            if (xobj.readyState == 4 && xobj.status == "200"){
                                callback(xobj.responseText);
                            }
                        };
                        xobj.send(null);
                    }
                    loadJSON(function(p){
                        $scope.$apply(function(){
                            $scope.effects = JSON.parse(p);
                            _shades.initEffects($scope.effects);
                        });
                    });
                }
            }

            //--------------------------------------------------

            $scope.deletePresets = function(presetsKey){
                var c = confirm('Delete preset ?');
                if(c){
                    $scope.presetsCollection.splice(presetsKey, 1);
                    var pc = angular.toJson($scope.presetsCollection);
                    localStorage.setItem('presetsCollection', pc);

                    if($scope.lastPresetsLoaded >= $scope.presetsCollection.length){
                        $scope.lastPresetsLoaded = 0;
                        localStorage.setItem('lastPresetsLoaded', $scope.lastPresetsLoaded);
                    }

                    if($scope.presetsCollection.length == 0){
                        localStorage.removeItem('presetsCollection');
                    }
                }
            };

            //--------------------------------------------------

            $scope.loadPresets = function(presetsKey){

                $scope.lastPresetsLoaded = presetsKey;
                localStorage.setItem('lastPresetsLoaded', $scope.lastPresetsLoaded);

                $scope.effects = angular.copy($scope.presetsCollection[$scope.lastPresetsLoaded].data);

                _shades.presets = $scope.effects;
                _shades.setEffects();
                _shades.setChain();
            };

            //--------------------------------------------------

            $scope.saveSettings = function(){

                $scope.presetsCollection.push({
                    name: $scope.newPresetName,
                    data: angular.copy($scope.effects)
                });

                //

                var pc = angular.toJson($scope.presetsCollection);
                localStorage.setItem('presetsCollection', pc);

                //

                $scope.displaySaveModal = false;
                $scope.newPresetName = '';
            };

            //--------------------------------------------------

            $scope.toggleEffect = function(effectKey, active){
                _shades.toggleEffect(effectKey, active);
            };

            //--------------------------------------------------

            $scope.updateParam = function(effectKey, paramKey, value){
                _shades.setParam(effectKey, paramKey, value);
            };

            //--------------------------------------------------

            $scope.showModal = function(target){
                if(target == 'save'){
                    $scope.displaySaveModal = true;
                    $scope.displayPresets = false;
                } else if(target == 'presets'){
                    if($scope.displayPresets){
                        $scope.displayPresets = false;
                    } else {
                        $scope.displayPresets = true;
                    }
                    $scope.displaySaveModal = false;
                } else if(target == 'close'){
                    $scope.displayPresets = false;
                    $scope.displaySaveModal = false;
                }
            };

            //--------------------------------------------------

            init();
        }]);

        //---------------------------------------

        var el = document.getElementById('gui');
        var visible = true;
        document.addEventListener('keyup', function(e){
            //console.log(e.keyCode);
            if(e.keyCode == '97'){
                if(visible){
                    el.style.visibility = 'hidden';
                    visible = false;
                } else {
                    el.style.visibility = 'visible';
                    visible = true;
                }
            }
        });
    }
}