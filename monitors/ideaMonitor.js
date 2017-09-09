let docsReader = require('../helpers/sheetHelper.js');
let winston = require('winston');
let ideaFormatter = require("../formatters/ideaFormatter");
let monitor = require("./monitor");

class ideaMonitor extends monitor{

    trigger() {
        super.trigger();
        docsReader.getUnNotifiedIdea().then((idea) => {
            this.triggerSuccess(idea);
        },(err)=>{
            this.triggerFail(err);
        });
    }

    triggerSuccess(idea) {
        winston.debug(`monitor (${this.name}) successfully triggered finding ${JSON.stringify(idea)}`);
        let channel = this.channels[this.channel];

        this.bot.reply({channel}, ideaFormatter.formatIdea(idea));
        ideaFormatter.addLink(this.bot,{channel});
        docsReader.setIdeaAsNotified(idea.row);
    }

    triggerFail(err) {
        winston.debug(`monitor (${this.name}) did not trigger ${err}`)
    }
}

module.exports = ideaMonitor;