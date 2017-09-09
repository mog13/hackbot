let docsReader = require('../helpers/sheetHelper.js');
let winston = require('winston');
let techFormatter = require("../formatters/techFormatter");
let monitor = require("./monitor");

class techMonitor extends monitor {

    trigger() {
        super.trigger();
        docsReader.getAnyTech().then((tech) => {
         this.triggerSuccess(tech);
        }, (err) => {
          this.triggerFail(err)
        });
    }

    triggerSuccess(tech) {
        winston.debug(`monitor (${this.name}) successfully triggered finding ${JSON.stringify(tech)}`);
        this.bot.reply({channel: this.channels[this.channel]}, techFormatter.formatTech(tech));
    }

    triggerFail(err) {
        winston.debug(`monitor (${this.name}) did not trigger ${err}`)
    }
}


module.exports = techMonitor;