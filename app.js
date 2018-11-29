require('dotenv').config();

let httpServer = require('./httpServer');
let routeIndex = require('./routes/index');
let wsEvents = require('./ws/events');
let requestScheduler = require('./lib/requestScheduler');

let {app, server} = httpServer.start();
routeIndex.addTo(app);
global.io = require('socket.io')(server);
wsEvents.addEvents(global.io);
server.listen(process.env.PORT);

global.requestStack = new requestScheduler.scheduler([0, 10, 20, 30, 40, 50]); //Hämtar varje 10:e sekund'
global.requestStack.run();
