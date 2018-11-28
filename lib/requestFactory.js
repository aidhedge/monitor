let request = require('request');

module.exports = {};

createRequest = function (url) {
    var options = {
        url: url,
        headers: {
            'User-Agent': 'request'
        }
    }
    var requestObject = {
        go: function () {
            console.log("Getting data from " + options.url); // 200
            request
                .get(options)
                .on('response', function (response) {
                    console.log("Response from " + options.url); // 200
                    console.log(options.url); // 200
                })
                .on('error', function(){
                    console.log('Error - fortsätter');
                })

        }

    }
    return requestObject;
}

module.exports.createRequest = createRequest;