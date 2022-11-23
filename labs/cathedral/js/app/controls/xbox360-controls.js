/**
*
* @author th0maslh0est
*
**/
class Xbox360Controls{

    constructor(camera, options){

        this.gamepad = navigator.getGamepads()[0];
        if(this.gamepad){
            console.log('%c Gamepad detected --> ' + this.gamepad.id + ' ', 'background: #F0FF76; color: #111');
            //console.log(this.gamepad);
        }

        //-----------------------------

        this.camera = camera;
        this.camera.position.set(0, 0, 0);
        this.camera.rotation.set(0, 0, 0);

        this.pitchObject = new THREE.Object3D();
        this.pitchObject.add(this.camera);

        this.yawObject = new THREE.Object3D();
        this.yawObject.add(this.pitchObject);
        this.yawObject.position.set(options.position.x, options.position.y, options.position.z);

        //-----------------------------

        this.bodySpeed = options.bodySpeed;
        this.headSpeed = options.headSpeed / 200;
    }

    get object(){
        return this.yawObject;
    }

    moveX(translateX){
        this.yawObject.translateX(translateX);
    }

    moveY(translateY){
        this.yawObject.translateY(translateY);
    }

    moveZ(translateZ){
        this.yawObject.translateZ(translateZ);
    }

    rotate(pitch, yaw){
        this.yawObject.rotation.y -= yaw;
        this.pitchObject.rotation.x -= pitch;
        this.pitchObject.rotation.x = Math.max(-(Math.PI / 2), Math.min((Math.PI / 2), this.pitchObject.rotation.x));
    }

    sprint(){
        var sprint = 0;
        // if 'sprint'
        if(this.gamepad.buttons[10].value > 0.9){
            sprint = this.bodySpeed * 2;
        } else {
            sprint = 0;
        }
        return sprint;
    }

    modifySpeed(){
        if(this.gamepad.buttons[4].value == 1){
            if(this.bodySpeed > 0.5){
                this.bodySpeed -= 0.05;
            }
            if(this.headSpeed > 2){
                this.headSpeed -= 0.00001;
            }
        }
        if(this.gamepad.buttons[5].value == 1){
            if(this.bodySpeed < 15){
                this.bodySpeed += 0.05;
            }
            if(this.headSpeed < 8){
                this.headSpeed += 0.00001;
            }
        }
    }

    render(){
        this.gamepad = navigator.getGamepads()[0];
        if(this.gamepad){

            var sprint = this.sprint();

            var translateX = Xbox360Controls.applyDeadzone(this.gamepad.axes[0], 0.25) * (this.bodySpeed + sprint);
            var translateY = (-this.gamepad.buttons[6].value + this.gamepad.buttons[7].value) * this.bodySpeed;
            var translateZ = Xbox360Controls.applyDeadzone(this.gamepad.axes[1], 0.25) * (this.bodySpeed + sprint);
            var yaw = Xbox360Controls.applyDeadzone(this.gamepad.axes[2], 0.25) * this.headSpeed;
            var pitch = Xbox360Controls.applyDeadzone(this.gamepad.axes[3], 0.25) * this.headSpeed;

            this.moveX(translateX);
            this.moveY(translateY);
            this.moveZ(translateZ);
            this.rotate(pitch, yaw);

            this.modifySpeed();
        }
    }

    static applyDeadzone(number, threshold){
        var percentage = (Math.abs(number) - threshold) / (1 - threshold);
        if(percentage < 0)
            percentage = 0;
        return percentage * (number > 0 ? 1 : -1);
    }
}
