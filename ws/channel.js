module.exports = {};

hasUsers = function(channel){
    let ioChannel = global.io.sockets.adapter.rooms[channel];
    if(ioChannel){
        console.log('Antal i channel ',channel,' ', ioChannel.length);
        return true;
    }
    else{
        console.log('Antal i channel ',channel, ' 0'); }
        return false;
}

emit = function(channel, event, msg){
    console.log(`Emit event ${event} to ${channel}: ${JSON.stringify(msg)}`);
    global.io.sockets.to(channel).emit(event, msg);
}

module.exports.emit = emit;
module.exports.hasUsers = hasUsers;