let schedule = require('node-schedule');
let requestIO = require('./requestFactory');

module.exports = {};

class scheduler {
    constructor(rule) {
        this.rule = new schedule.RecurrenceRule();
        this.rule.second = rule;
        this.stack = [];
    }

    pushToStack(url) {
        this.stack.push(requestIO.createRequest(url));
    }

    run() {
        var self = this;
        schedule.scheduleJob(this.rule, function () {

            var stack = self.stack.splice(0, 5);
            stack.forEach(req => {
                // console.log('Stack length: '+self.stack.length)
                req.go();
            });
        });
    }

}

module.exports.scheduler = scheduler;