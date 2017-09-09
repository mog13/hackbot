"use strict";
let winston = require('winston');
let sheets = require('googleapis').sheets('v4');
let authentication = require("../credentials/authentication");
let buildIdea = require("../formatters/ideaFormatter").buildIdea;
let buildTech = require("../formatters/techFormatter").buildTech;

//change to your spreadsheet id!
const spreadsheetId = '1a9XpF8mvb2V5dOaqsy1iVDnx6a4mgOpFeRtFcpnkGvg';
let auth;

function generateAuth() {
    authentication.authenticate().then(credentials => {
        auth = credentials
    });
}
generateAuth();

//given a row it will  mark as the idea having already been used by hackbot
function setIdeaAsNotified(row) {
    winston.debug(`setting idea at row ${row} to true`);
    sheets.spreadsheets.values.update({
        auth,
        spreadsheetId,
        range: "ideas!F" + row,
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [
                ["true"]
            ]
        }
    })
}

//get all ideas from spreadsheet
function getIdeas() {
    return new Promise((res, rej) => {
        sheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: 'ideas!B3:F100',
        }, (err, response) => {
            if (err || !response.values) {
                winston.error('The API returned an error: ' + err);
                rej({});
            }
            else {
                let ideas = response.values.map((idea, index) => {
                    return buildIdea(idea, index);
                });
                res(ideas);
            }
        });
    })
}

//gets any random idea
function getAnyIdea() {
    return new Promise((res, rej) => {
        getIdeas().then((ideas) => {
            //stop being lazy...
            res(shuffle(ideas)[0]);
        })
    })
}

//get an idea that hasnt been announced by hackbot yet
function getUnNotifiedIdea() {
    return new Promise((res, rej) => {
        getIdeas().then((ideas) => {
            //will return when it finds an un-anounced idea
            shuffle(ideas).forEach((idea) => {
                if (!idea.suggested) res(idea);
            });
            //if after all of them it hasnt then reject the promise
            rej(null);
        })
    });
}

function getTech() {
    return new Promise((res, rej) => {
        sheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: 'Tools!B3:E200',
        }, (err, response) => {
            if (err) {
                console.log('The API returned an error: ' + err);
                rej({});
            }
            let allTech = response.values.map((tech, index) => {
                return buildTech(tech, index);
            });
            res(allTech);
        });
    })
}

function getAnyTech() {
    return new Promise((res, rej) => {
        getTech().then((tech) => {
            //stop being lazy...
            res(shuffle(tech)[0]);
        })
    })
}

function addRegistrant(username) {
    return new Promise((res, rej) => {
        sheets.spreadsheets.values.append({
            auth: auth,
            spreadsheetId,
            range: "Registered!A1:A100",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [username]
                ]
            }
        }, (err, response) => {
            if (err) rej(err);
            res(response)
        })
    })
}


//utility function
function shuffle(a) {
    if(a === undefined) return [];
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
}


module.exports = {getUnNotifiedIdea, setIdeaAsNotified, getAnyIdea, addRegistrant, getAnyTech};

