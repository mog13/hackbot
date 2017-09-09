let splain = require("@mog13/splain");
function formatTech(tech) {
    return splain.process(`{{tech.intro}}: <${tech.link}|${tech.name}>! {{tech.extra}}: " ${tech.overview}."`);
}

function buildTech(input, index) {
    return ({
        row: index + 3,
        name: input[0],
        service: input[1],
        overview: input[2],
        link: input[3],
    })
}

module.exports = {
    formatTech,
    buildTech
};
