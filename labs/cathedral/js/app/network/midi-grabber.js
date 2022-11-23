let instance = null;

class MIDIGrabber{
    constructor(){

        // singleton stuff

        if(!instance){
            instance = this;
        }

        //--------------------

        var self = this;

        //--------------------

        this._message = {
            note: 0,
            velocity: 0
        };

        //--------------------

        if(navigator.requestMIDIAccess){
            navigator.requestMIDIAccess({
                sysex: false
            }).then(onMIDISuccess, onMIDIFailure);
        } else {
            alert("No MIDI support in your browser.");
        }

        //--------------------

        function onMIDISuccess(midiAccess){

            let inputs = midiAccess.inputs.values();

            for(let input = inputs.next(); input && !input.done; input = inputs.next()){

                console.log('%c ♫ - MIDI device detected --> ' + input.value.name + ' ', 'background: #FF9D5D; color: #43005D');

                input.value.onmidimessage = function(message){
                    let data = message.data;
                    let noteOn = data[0] == 144;
                    let note = data[1];
                    let velocity = data[2] / 124;

                    if(noteOn){
                        self._message = {
                            note: note,
                            velocity: velocity
                        };
                    } else {
                        self._message = {
                            note: note,
                            velocity: 0
                        };
                    }
                };
            }
        }

        //--------------------

        function onMIDIFailure(error){
            console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + error);
        }

        //--------------------

        return instance;
    }

    //------------------------------------------

    get message(){
        return this._message;
    }
}