function getuserDetails(bot, message) {
    return new Promise((res, rej) => {
        bot.api.users.info({user: message.user}, function (err, response) {
            if (err) {
                rej(err);
            }
            else {
                res(response["user"]);
            }
        });
    })
}

module.exports = {getuserDetails};
