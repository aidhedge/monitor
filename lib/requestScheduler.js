let schedule = require('node-schedule');
let requestIO = require('./requestFactory');

module.exports = {};

class scheduler {
    constructor(rule, batchSize=5) {
        this.rule = new schedule.RecurrenceRule();
        this.rule.second = rule;
        this.stack = [];
        this.batchSize = batchSize;
    }

    pushToStack(url) {
        this.stack.push(requestIO.createRequest(url));
    }

    run() {
        var self = this;
        schedule.scheduleJob(this.rule, function () {
            var stack = self.stack.splice(0, self.batchSize);
            if (stack.length === 0) {
                console.log('Waiting for requests..');
                return;
            }
            stack.forEach(req => {
                req.go();
            });
        });
    }

}

module.exports.scheduler = scheduler;