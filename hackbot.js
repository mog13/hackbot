'use strict';
let Botkit = require('botkit');
let winston = require('winston');
let tokens = require("./credentials/tokens");
let ideaMonitor = require('./monitors/ideaMonitor.js');
let techMonitor = require('./monitors/techMonitor.js');
let triggers = require('./triggers');
let splain = require("@mog13/splain");
let dict = require("./splainDictionary");
splain.addEntry(dict);

winston.level = "debug";

let bot, controller = Botkit.slackbot({
    debug: false
});

function startBot() {
    winston.debug("Starting bot");
    bot = controller.spawn({
        token: tokens.polybitToken,
    }).startRTM();
    triggers.setTriggers(controller)
}


function init() {
    startBot();
    new ideaMonitor(bot, "idea monitor", 1000*60*45);
    new techMonitor(bot, "tech monitor", 1000*60*45);
}

init();


controller.on('rtm_close', function(bot, err) {
    winston.debug("rtm closed attempting to startup again");
  setTimeout(()=>startBot(),5000);
});
