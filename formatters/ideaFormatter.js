let splain = require("@mog13/splain");
function getIntro(idea) {
    if(idea.suggester) return splain.process(`${idea.suggester} {{ideas.byPerson}}`);
    return splain.process(`{{ideas.byAnon}}`);
}

function addNotes(idea){
    if(!idea.notes) return "";
    else return splain.process(`\n {{ideas.notes}}: `) + idea.notes;
}

function formatIdea(idea) {
    return`${getIntro(idea)}:  ${idea.idea}. ${addNotes(idea)}`;
}

function buildIdea(input, index) {
    return ({
        row: index + 3,
        idea: input[0],
        category: input[1],
        notes: input[2],
        suggester: input[3],
        suggested: input[4]
    })
}

function addLink(bot, messageConfig) {
    setTimeout(()=>{
        bot.reply(messageConfig,`Add your own ideas <https://docs.google.com/spreadsheets/d/1a9XpF8mvb2V5dOaqsy1iVDnx6a4mgOpFeRtFcpnkGvg/edit?usp=sharing|here>`);
    },200)
}

module.exports = {formatIdea, buildIdea, addLink};
