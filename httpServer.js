module.exports = {};

var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);

start = function(port){
    console.log("Running server on port: "+process.env.PORT);
    return {app, server};
}

module.exports.start = start;
