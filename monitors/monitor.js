let winston = require('winston');
let timeout = null;

class monitor{

    constructor(bot, name, minTimeout, timeoutSpan){
        this.bot = bot;
        this.name = name;
        this.timeout = minTimeout || 1000*60*60;
        this.timeoutSpan = timeoutSpan || this.timeout*3;
        this.channels = {
            default: 'channelName',
        };
        this.channel = "default";

        this.setTrigger();
    }

    setTrigger() {
        let interval =this.timeout + Math.random()*this.timeoutSpan;
        winston.debug(`monitor (${this.name}) setting timeout at ${interval}`)
        timeout = setTimeout(()=>{
            this.trigger();
            this.setTrigger();
        }, interval);
    }

    trigger() {
        winston.debug(`monitor (${this.name}) triggered base trigger`)
    }

}

module.exports = monitor;