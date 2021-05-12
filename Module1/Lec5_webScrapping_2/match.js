const cheerio = require("cheerio");
const request = require("request");
const json2xls = require('json2xls');
const fs = require("fs");
// let matchLink = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";

let countOfRequestSent = 0;
function getMatchDetails(matchLink) {
    console.log("Sending Request", countOfRequestSent);


    request(matchLink, function (error, response, data) {
        countOfRequestSent--;

        processData(data);

        console.log("callback", countOfRequestSent);
        if (countOfRequestSent == 0) {
            let leaderboardFilePath = `./leaderboard.json`;
            let board = JSON.parse(fs.readFileSync(leaderboardFilePath));

            var xls = json2xls(board);

            fs.writeFileSync('./data.xlsx', xls, 'binary');
        }
    })
    countOfRequestSent++;
}


function processData(html) {

    let myDocument = cheerio.load(html);
    let bothInnings = myDocument(".card.content-block.match-scorecard-table .Collapsible");
    for (let i = 0; i < bothInnings.length; i++) {
        let oneInning = myDocument(bothInnings[i]);
        // <div class="Collapsible"></div>
        let teamName = oneInning.find("h5").text();
        teamName = teamName.split("INNINGS")[0].trim();
        //console.log(teamName);
        let allTrs = oneInning.find(".table.batsman tbody tr");
        for (let j = 0; j < allTrs.length - 1; j++) {
            let allTds = myDocument(allTrs[j]).find("td");
            if (allTds.length > 1) {
                // batsmanName allTds[0]
                let batsmanName = myDocument(allTds[0]).text().trim();
                // runs allTds[2]
                let runs = myDocument(allTds[2]).text().trim();
                // balls
                let balls = myDocument(allTds[3]).text().trim();
                // fours allTds[5]
                let fours = myDocument(allTds[5]).text().trim();
                // sixes allTds[6]
                let sixes = myDocument(allTds[6]).text().trim();
                // sr allTds[7]
                let strikeRate = myDocument(allTds[7]).text().trim();
                // console.log(`Batsman = ${batsmanName} Runs = ${runs} Balls = ${balls} Fours = ${fours} Sixes = ${sixes} StrikeRate = ${strikeRate}`);
                processDetails(teamName, batsmanName, runs, balls, fours, sixes, strikeRate);
                processDetailsonLeaderBoard(teamName, batsmanName, runs, balls, fours, sixes, strikeRate);

            }
        }
    }
    //console.log("############################################");
}

function checkTeamFolder(teamName) {
    // teamFolderPath = "./IPL/Delhi Capitals"
    let teamFolderPath = `./IPL/${teamName}`;
    return fs.existsSync(teamFolderPath);
}
function checkBatsmanFile(teamName, batsmanName) {
    // "./IPL/Delhi Capitals/Rishabh pant.json"
    let batsmanFilePath = `./IPL/${teamName}/${batsmanName}.json`;
    return fs.existsSync(batsmanFilePath);
}
function updateBatsmanFile(teamName, batsmanName, runs, balls, fours, sixes, strikeRate) {
    let batsmanFilePath = `./IPL/${teamName}/${batsmanName}.json`;
    let batsmanFile = JSON.parse(fs.readFileSync(batsmanFilePath));
    let inning = {
        Runs: runs,
        Balls: balls,
        Fours: fours,
        Sixes: sixes,
        StrikeRate: strikeRate
    }
    batsmanFile.push(inning);
    fs.writeFileSync(batsmanFilePath, JSON.stringify(batsmanFile));
}
function createBatsmanFile(teamName, batsmanName, runs, balls, fours, sixes, strikeRate) {
    let batsmanFilePath = `./IPL/${teamName}/${batsmanName}.json`;
    let batsmanFile = [];
    let inning = {
        Runs: runs,
        Balls: balls,
        Fours: fours,
        Sixes: sixes,
        StrikeRate: strikeRate
    }
    batsmanFile.push(inning);
    fs.writeFileSync(batsmanFilePath, JSON.stringify(batsmanFile));
}
function createTeamFolder(teamName) {
    let teamFolderPath = `./IPL/${teamName}`;
    fs.mkdirSync(teamFolderPath);
}

function processDetails(teamName, batsmanName, runs, balls, fours, sixes, strikeRate) {
    let isTeamFolder = checkTeamFolder(teamName);
    if (isTeamFolder) {
        let isBatsmanPresent = checkBatsmanFile(teamName, batsmanName);
        if (isBatsmanPresent) {
            updateBatsmanFile(teamName, batsmanName, runs, balls, fours, sixes, strikeRate);
        }
        else {
            createBatsmanFile(teamName, batsmanName, runs, balls, fours, sixes, strikeRate);
        }
    }
    else {
        createTeamFolder(teamName);
        createBatsmanFile(teamName, batsmanName, runs, balls, fours, sixes, strikeRate);
    }
}
function checkLeaderBoard() {
    let leaderboardFilePath = `./leaderboard.json`;
    return fs.existsSync(leaderboardFilePath);
}
function createLeaderBoard() {
    let leaderboardFilePath = `./leaderboard.json`;
    let board = [];
    fs.writeFileSync(leaderboardFilePath, JSON.stringify(board));
}
function checkbatsmanName(teamName, batsmanName) {
    let leaderboardFilePath = `./leaderboard.json`;
    let batsman = JSON.parse(fs.readFileSync(leaderboardFilePath));
    for (let i = 0; i < batsman.length; i++) {
        if (batsman[i].Name == batsmanName && batsman[i].Team == teamName)
            return true;
    }
    return false;
}
function createbatsmanName(teamName, batsmanName, runs, balls, fours, sixes, strikeRate) {
    let leaderboardFilePath = `./leaderboard.json`;
    let data = JSON.parse(fs.readFileSync(leaderboardFilePath));
    if (data.length == 0) {
        let board = [];
        let player = {
            Name: batsmanName,
            Team: teamName,
            Runs: runs,
            Balls: balls,
            Fours: fours,
            Sixes: sixes,
        }
        board.push(player);
        fs.writeFileSync(leaderboardFilePath, JSON.stringify(board));
    }
    else {
        let player = {
            Name: batsmanName,
            Team: teamName,
            Runs: runs,
            Balls: balls,
            Fours: fours,
            Sixes: sixes,
        }
        data.push(player);
        fs.writeFileSync(leaderboardFilePath, JSON.stringify(data));
    }
}
function updatebatsmanName(teamName, batsmanName, runs, balls, fours, sixes, strikeRate) {
    let leaderboardFilePath = `./leaderboard.json`;
    let board = JSON.parse(fs.readFileSync(leaderboardFilePath));
    for (let i = 0; i < board.length; i++) {
        if (board[i].Name == batsmanName && board[i].Team == teamName) {
            board[i].Runs = parseInt(board[i].Runs) + parseInt(runs);
            board[i].Balls = parseInt(board[i].Balls) + parseInt(balls);
            board[i].Fours = parseInt(board[i].Fours) + parseInt(fours);
            board[i].Sixes = parseInt(board[i].Sixes) + parseInt(sixes);
            break;
        }
    }
    fs.writeFileSync(leaderboardFilePath, JSON.stringify(board));
}
function processDetailsonLeaderBoard(teamName, batsmanName, runs, balls, fours, sixes, strikeRate) {
    let isleaderBoard = checkLeaderBoard();
    if (isleaderBoard) {
        let isbatsmanName = checkbatsmanName(teamName, batsmanName);
        if (isbatsmanName) {
            updatebatsmanName(teamName, batsmanName, runs, balls, fours, sixes, strikeRate);
        }
        else {
            createbatsmanName(teamName, batsmanName, runs, balls, fours, sixes, strikeRate);
        }
    }
    else {
        createLeaderBoard();
        createbatsmanName(teamName, batsmanName, runs, balls, fours, sixes, strikeRate);
    }

}


module.exports = getMatchDetails;