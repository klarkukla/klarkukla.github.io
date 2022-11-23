class OSCGrabber{
    static listen(socket){
        socket.on('receive-osc', function(message){
            if(message['0'] == '/midi/noteon'){
                //console.log(message['2']);
                //console.log(message['3']);
            }
        });
    }
}