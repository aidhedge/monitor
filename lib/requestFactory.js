let request = require('request');
let ioChannel = require('../ws/channel');


module.exports = {};

createRequest = function (channel) {
    var options = {
        url: 'https://apilayer.net/api/live?access_key=' + process.env.CURRENCY_API_KEY + '&currencies=' + channel.slice(0, 3) + '&source=' + channel.slice(-3) + '&format=1',
        consoleFriendlyUrl: 'https://apilayer.net/api/live?access_key=****&currencies=' + channel.slice(0, 3) + '&source=' + channel.slice(-3) + '&format=1',
        headers: {
            'User-Agent': 'request'
        }
    }
    var requestObject = {
        status: 'idle',
        channel: channel,
        go: function () {
            if (this.status === 'pending') {
                return;
            }
            this.status = 'pending';
            console.log("Getting data from " + options.consoleFriendlyUrl); // 200
            var self = this;
            request.get(options, function (err, httpResponse, body) {
                if (err) {
                    console.log(err);
                    self.status = 'idle';
                    return;
                }
                body = JSON.parse(body);
                var quotes = body.quotes;
                var res = {
                    success: body.success,
                    timestampFromProvider: body.timestamp,
                    timestamp:Math.floor(new Date() / 1000),
                    channel: channel,
                    quote: quotes[Object.keys(quotes)[0]]
                };
                ioChannel.emit(channel, 'currency', res);
                self.status = 'idle';
            });


        }

    }
    return requestObject;
}

module.exports.createRequest = createRequest;