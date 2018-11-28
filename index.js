process.env.PORT = 3000;

let httpServer = require('./httpServer');
let wsEvents = require('./ws/events');
let routeIndex = require('./routes/index');

let {app, server} = httpServer.start();

routeIndex.addTo(app);

global.io = require('socket.io')(server);
wsEvents.addEvents(global.io);

server.listen(process.env.PORT);
// let requestScheduler = require('./requestScheduler');

// var requestStack = new requestScheduler.scheduler([0, 10, 20, 30, 40, 50]); //Hämtar varje 10:e sekund'
// requestStack.pushToStack('http://www.dn.se')
// requestStack.pushToStack('http://www.blocket.se')
// requestStack.pushToStack('http://www.svd.se')
// requestStack.pushToStack('http://www.svd.se')

// requestStack.run();

// requestStack.pushToStack('http://www.dn.se')
// requestStack.pushToStack('http://www.blocket.se')
// requestStack.pushToStack('http://www.svd.se')
// requestStack.pushToStack('http://www.svd.se')

// setTimeout(function () {
//     requestStack.pushToStack('http://www.sl.se')
// }, 10000);