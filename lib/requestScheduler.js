let schedule = require('node-schedule');
let channel = require('../ws/channel');
let _ = require('lodash');

module.exports = {};

class scheduler {
    constructor(rule, batchSize = 5) {
        this.rule = new schedule.RecurrenceRule();
        this.rule.second = rule;
        this.stack = [];
        this.batchSize = batchSize;
    }

    pushToStack(requestObject) {
        if(this.stack.filter(function (obj) { return obj.channel === requestObject.channel; }).length === 0){
            this.stack.push(requestObject);
            return true;
        }
        else{
            return false;
        }
    }
    clean() {
        //removes requestObject:s that insn't needed    
        var self = this;
        let stack = this.stack;
        stack.forEach(req => {
            if (!channel.hasUsers(req.channel)) {
                console.log('Removing channel ', req.channel)
                self.stack = self.stack.filter(function(obj){
                    return obj.channel !== req.channel;
                });
                console.log(self.stack);
            }

        });
    }

    run() {
        console.log('Starting request stack');
        var self = this;
        schedule.scheduleJob(this.rule, function () {
            self.clean();
            if (self.stack.length === 0) {
                console.log('Waiting...');
            }
            self.stack.forEach(req => {
                req.go();
            });
        });
    }

}

module.exports.scheduler = scheduler;