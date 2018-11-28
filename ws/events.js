// socket events
module.exports.addEvents = function(io){
   
io.on("connection", function(socket) {
  console.log("User connected");
  let event = 'welcome';
  let msg = 'welcome man';
  socket.emit(event, msg);
});
};



