const ideaFormatter = require("./formatters/ideaFormatter");
const techFormatter = require("./formatters/techFormatter");
const userHelper = require("./helpers/userHelper");
const docsReader = require("./helpers/sheetHelper");

let helpTriggers = ["help","what do you do", "who are you"];
let ideaTriggers = ["idea", "project", "brainstorm", "ideas", "projects"];
let techTriggers = ["tech", "software", "free" ,"tools", "technology", "tool", "service", "SASS"];
let interestTriggers = ["register", "interest", "sign"];
let hackathonTriggers = ["hackathon"];
let splain = require("@mog13/splain");
let allTrigers = helpTriggers.concat(ideaTriggers, techTriggers, interestTriggers, hackathonTriggers);

function getIntro() {

    let intro = `{{fullIntro}} I can tell you about ideas people have suggested for the hackathon already and occasionally link you to interesting software and solutions. You can interact with me by mentioning my name @hackbot or send me a private message.
Try the following commands:
* I can give you an idea for your team to hack: Give me an idea
* I can show you some software ideas: What tech could I use?
* I can also register your interest for the hackathon: Sign me up!`;
    return splain.process(intro);
}

function setTriggers(controller) {
    controller.hears(allTrigers, ['direct_message', 'direct_mention', 'mention'], function (bot, message) {
        function containsTriggers(element) {
            return message.text.toLowerCase().includes(element);
        }

        if (helpTriggers.some(containsTriggers)) {
            bot.reply(message,getIntro())
        }
        else if (ideaTriggers.some(containsTriggers)) {
            docsReader.getAnyIdea().then((idea) => {
                bot.reply(message, '<@' + message.user + '>:\n' + ideaFormatter.formatIdea(idea));
                ideaFormatter.addLink(bot, message);
            });
        }
        else if (techTriggers.some(containsTriggers)) {
            docsReader.getAnyTech().then((tech) => {
                bot.reply(message, '<@' + message.user + '>:\n' + techFormatter.formatTech(tech))
            });
        }
        else if (interestTriggers.some(containsTriggers)) {
            userHelper.getuserDetails(bot, message).then((user) => {
                docsReader.addRegistrant(user.real_name).then(function () {
                    bot.reply(message, splain.process(`{{interest.thank}} ${user.name} {{interest.registered}}`));
                })

            });
        }
        else if (hackathonTriggers.some(containsTriggers)) {
            bot.reply(message, `A hackathon is a design sprint-like event in which computer programmers and others involved in software development, including graphic designers, interface designers, project managers, business analysts and others, collaborate intensively on software projects.
Occasionally, some hackathons are intended simply for educational or social purposes, although in many cases the goal is to try and create usable software.`);
        }
        else {
            bot.reply(message, 'Sorry Morgan screwed up my programming :(.');
        }

    });
}

module.exports = {setTriggers};