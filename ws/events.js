let requestIO = require('./../lib/requestFactory');

module.exports.addEvents = function (io) {

    io.on("connection", function (socket) {
        console.log("User connected");
        socket.emit('connected', { status: true });

        socket.on('subscribe', function (channel) {
            socket.join(channel);

            requestObject = requestIO.createRequest(channel);
            if(global.requestStack.pushToStack(requestObject)){
                console.log("User subscribing to channel: " + channel);
                socket.emit('subscribed', { status: true, channel: channel});
            }
            else{
                console.log("User already subscribing to channel: " + channel);
                socket.emit('subscribed', { status: false, channel: channel});
            }

            
        });

        socket.on('unsubscribe', function (channel) {
            socket.leave(channel);
            console.log("User unsubscribing to channel: " + channel);
            socket.emit('unsubscribed', { status: true, channel: channel});
        });
    });

};