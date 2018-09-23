'use strict';
const util = require('./util.js');

/////////////////////scrapeWinston'sLab

exports.winstonCharPlayer = ()=> {
  util.setScrapeSource('./scrapeExamples/winston.js');
  
  let tempChar = {};
  
  let charNameArray = util.scrapeData('.hero-name > span', null);
  let playerNameArray = util.scrapeData('.hero-player > a', null);
  let heroWinPercentageArray = util.scrapeData(('.hero-winrate.positive,.hero-winrate.negative'), null); // win rate = timewWon/timePlayed
  let needsFix1 = util.scrapeData('td.table-page1', '%'); //TODO: take each 3rd element and push it in another array
// teamKillsPercentageArray = needsFix1[0];
// teamDeathsPercentage = needsFix[1];
// garbage1 = needsFix[3];
  let needsFix2 = util.scrapeData('.table-avg10.table-page1', null); // TODO:take each 3rd element and push it in another array
// killsAvgPer10 = needsFix2[0];
// deathsAvgPer10 = needsFix2[1];
// killsDividedByDeaths = needsFix2[2];
  let killsDeathsPer10min = util.scrapeData('.table-avg10.table-page1.positive,.table-avg10.table-page1.negative', null);
// gets only red and green numbers
  console.log(playerNameArray);
  console.log("\n\n\n\n\n\n\n\n\n\n\n");
  console.log(charNameArray);
  console.log("\n\n\n\n\n\n\n\n\n\n\n");
  console.log(heroWinPercentageArray);
  /*TODO:figure out why heroWinPercentage misses one element*/
  
};

exports.olCharPlayer = ()=> {
  let charArr = [];
  //let playerName = scrapeData('.PlayerHandle-handle',null);
  let championsPlayedArray = util.scrapeData('.Table-data.Table-data--extended.u-uppercase', null);
  let percentageChampPlayedArray = util.scrapeData('.Table-data.Table-data--emphasized.u-text-right.u-text-nowrap', null);
  let timeChampPlayedArray = util.scrapeData('.Table-data.u-text-right.u-text-nowrap', 's');
  let numbersStats10MinArray = ['damage', 'healing', 'finalBlows', 'elims', 'deaths'];
  let scrapedNumbersStats10MinArray = util.scrapeData('.Table-data.u-text-right:not(.Table-data--emphasized):not(.u-text-nowrap)', null);
//                                                                    //TODO:match numbersStatsArray with this array to get teach value on it's own.
//let numbersStatsLeagueRankArray = scrapeCharsDataOL('.Table-data.Table-data--emphasized.u-text-right:not(.u-text-nowrap)')
  
  for (let i = 0; i < championsPlayedArray.length; i++) {
    charArr.push({
      name: championsPlayedArray[i].toLowerCase(),
      timePlayed: timeChampPlayedArray[i],
      playPercentage: percentageChampPlayedArray[i]
    });
  }
  console.log(charArr)
};

