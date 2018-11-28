// var httpServer = require('./httpServer.js');
module.exports = {};

add = function(app){
    app.get('/', function (req, res) {
        res.sendFile('index.html', {root: './views'});
    });
};
 module.exports.addTo = add;

