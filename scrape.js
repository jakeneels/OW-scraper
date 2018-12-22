'use strict';
const util = require('./util.js');
let player = require('./models/player.js');
const cheerio = require('cheerio');


/*
scrapeWinston'sLab
*/
exports.winstonCharPlayer = () => {  // https://www.winstonslab.com/customquery/comparePlayers/?dateGreater=&dateSmaller=&event%5B%5D=86&specificMatchupTeam1=0&specificMatchupTeam2=0&team%5B%5D=&player%5B%5D=17&time=0&alloreach=2&maptype%5B%5D=&map%5B%5D=&roundtype%5B%5D=&statsBy=1&heroes=
    util.setScrapeSource('./scrapeExamples/winston.js');

    let tempChar = {};

    const charNameArray = util.scrapeData('.hero-name > span', null);
    const playerNameArray = util.scrapeData('.hero-player > a', null);
    const heroWinPercentageArray = util.scrapeData(('.hero-winrate.positive,.hero-winrate.negative'), null); // win rate = timewWon/timePlayed
    const needsFix1 = util.scrapeData('td.table-page1', '%'); //TODO: take each 3rd element and push it in another array
// teamKillsPercentageArray = needsFix1[0];
// teamDeathsPercentage = needsFix[1];
// garbage1 = needsFix[3];
    const needsFix2 = util.scrapeData('.table-avg10.table-page1', null); // TODO:take each 3rd element and push it in another array
// killsAvgPer10 = needsFix2[0];
// deathsAvgPer10 = needsFix2[1];
// killsDividedByDeaths = needsFix2[2];
    const killsDeathsPer10min = util.scrapeData('.table-avg10.table-page1.positive,.table-avg10.table-page1.negative', null);
// gets only red and green numbers
    console.log(playerNameArray);
    console.log("\n\n\n\n\n\n\n\n\n\n\n");
    console.log(charNameArray);
    console.log("\n\n\n\n\n\n\n\n\n\n\n");
    console.log(heroWinPercentageArray);
    /*TODO:figure out why heroWinPercentage misses one element*/
};

/*
OverWatch League
*/
exports.olCharPlayer = () => {

    let charArr = [];
    /**
     SCRAPED VARS
     */
        //1 per player
    const playerName = util.scrapeData('.PlayerHandle-handle', null);
    const scrapedNumbersStats10MinArray = util.scrapeData('.Table-data.u-text-right:not(.Table-data--emphasized):not(.u-text-nowrap)', null);
     // one per char
    const championsPlayedArray = util.scrapeData('.Table-data.Table-data--extended.u-uppercase', null);
    const percentageChampPlayedArray = util.scrapeData('.Table-data.Table-data--emphasized.u-text-right.u-text-nowrap', null);
    const timeChampPlayedArray = util.scrapeData('.Table-data.u-text-right.u-text-nowrap', 's');
    const numbersStatsLeagueRankArray = util.scrapeData('.Table-data.Table-data--emphasized.u-text-right:not(.u-text-nowrap)');

    //TODO:match numbersStatsArray with this array to get teach value on it's own.

    for (let i = 0; i < championsPlayedArray.length; i++) {
        charArr.push({
            name: championsPlayedArray[i].toLowerCase(),
            timePlayed: timeChampPlayedArray[i],
            playPercentage: percentageChampPlayedArray[i]
        });
    }

    player.name = playerName;
    player.stats.damage.avgPerTenMin = scrapedNumbersStats10MinArray[0];
    player.stats.damage.leagueRank = numbersStatsLeagueRankArray[0];
    player.stats.healing.avgPerTenMin = scrapedNumbersStats10MinArray[1];
    player.stats.healing.leagueRank = numbersStatsLeagueRankArray[1];
    player.stats.finalBlows.avgPerTenMin = scrapedNumbersStats10MinArray[2];
    player.stats.finalBlows.leagueRank = numbersStatsLeagueRankArray[2];
    player.stats.eliminations.avgPerTenMin = scrapedNumbersStats10MinArray[3];
    player.stats.eliminations.leagueRank = numbersStatsLeagueRankArray[3];
    player.stats.deaths.avgPerTenMin = scrapedNumbersStats10MinArray[4];
    player.stats.deaths.leagueRank = numbersStatsLeagueRankArray[4];

    player.stats.chars = charArr;

    for (let key in player.stats.chars) {
        //console.log(key);
        charArr.forEach((char) => {
            //console.log(char.name);
            (char.name === 'soldier: 76') ? char.name = 'soldier76' : null;
            if (key === char.name && player.stats.chars.hasOwnProperty(key)) {
                player.stats.chars[key].timePlayed = char.timePlayed;
                player.stats.chars[key].playPercentage = char.playPercentage;
            }
        });
    }
    console.log('pushing ' + JSON.stringify(player.name));
    return player;
};


/*
AKSHON esports
*/
exports.akshonMatchTeam = () => {
    util.setScrapeSource('./scrapeExamples/akshon.js');
    ///////helpers////////////////
    const matchDiffPos = util.scrapeData('.border-right.positive > span', null);
    const matchDiffNeg = util.scrapeData('.border-right.negative > span', null);
    const mapDiffPos = util.scrapeData('.positive:not(.border-right) > span', null);
    const mapDiffNeg = util.scrapeData('.negative:not(.border-right) > span', null);
    const totalGames = '40';
    //////variables///////////////
    const teams = util.scrapeData('.full-name', null);
    console.log(teams);
    const matchDiff = matchDiffPos.concat(matchDiffNeg);
    const matchWinArr = [];
    for (let i = 0; i < matchDiff.length; i++) {
        const matchWin = totalGames - (totalGames - (matchDiff[i])) / 2;
        matchWinArr.push(matchWin)
    }
    let matchLossArr = [];
    for (let i = 0; i < matchDiff.length; i++) {
        const matchLoss = (totalGames - (matchDiff[i])) / 2;
        matchLossArr.push(matchLoss)
    }
    console.log(matchWinArr);
    console.log(matchLossArr);
    console.log(matchDiff);
    const matchMapDiff = mapDiffPos.concat(mapDiffNeg);
    console.log(matchMapDiff)
    // TODO: WTF IS THE FUCKING UNDEFINED? ok, i am chill now.
};

/*
AKSHON esports MAPS DATA
*/
exports.akshonMapTeam = () => {
    util.setScrapeSource('./scrapeExamples/akshonMapTeam.js');
};

exports.scrapeOLPlayerLinks = (path) => {
    let html = require(path);
    let $ = cheerio.load(html);
    let result = [];
    console.log('linkss');
    $('.sorting_1 > a[href]').each((index, elem) => {
        if ($(elem).attr('href').includes('players')) {
            result.push($(elem).attr('href'))
        }
        // console.log(index, $(elem).attr('href'));
    });
    console.log(result);
    return result;
};

/*
OL Team
*/
exports.OLTeam = () => {
    util.setScrapeSource('./scrapeExamples/OLTeams.js');
    let threeLetterTeamName = util.scrapeData('.IconLabel-item.hidden-md.hidden-lg.hidden-xl > b')

}


