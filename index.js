let requestScheduler = require('./requestScheduler');

var s = new requestScheduler.scheduler([0, 10, 20, 30, 40, 50]); //Hämtar varje 10:e sekund'
s.pushToStack('http://www.dn.se')
s.pushToStack('http://www.blocket.se')
s.pushToStack('http://www.svd.se')
s.pushToStack('http://www.svd.se')

s.run();

s.pushToStack('http://www.dn.se')
s.pushToStack('http://www.blocket.se')
s.pushToStack('http://www.svd.se')
s.pushToStack('http://www.svd.se')

setTimeout(function () {
    s.pushToStack('http://www.sl.se')
}, 10000);