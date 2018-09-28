'use strict';
const util = require('./util.js');
let player = require('./models/player.js');

/////////////////////scrapeWinston'sLab
exports.test = ()=>{
util.setScrapeSource('./scrapeExamples/test.js');

let loser = util.scrapeData('.overview-header-score-font > span' , '0'|| '1'|| '2'|| '3');
console.log(loser);
};

exports.winstonCharPlayer = () => {
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

exports.olCharPlayer = () => {
  // util.getSourceCode();
  
  util.setScrapeSource('./scrapeExamples/overwatchLeague.js');
  let charArr = [];
  
  /**
   SCRAPED VARS
   */
    //1 per player
  let playerName = util.scrapeData('.PlayerHandle-handle', null);
  let scrapedNumbersStats10MinArray = util.scrapeData('.Table-data.u-text-right:not(.Table-data--emphasized):not(.u-text-nowrap)', null);
  let numbersStatsLeagueRankArray = util.scrapeData('.Table-data.Table-data--emphasized.u-text-right:not(.u-text-nowrap)');
  // one per char
  let championsPlayedArray = util.scrapeData('.Table-data.Table-data--extended.u-uppercase', null);
  let percentageChampPlayedArray = util.scrapeData('.Table-data.Table-data--emphasized.u-text-right.u-text-nowrap', null);
  let timeChampPlayedArray = util.scrapeData('.Table-data.u-text-right.u-text-nowrap', 's');
  
  
  for (let i = 0; i < championsPlayedArray.length; i++) {
    charArr.push({
      name: championsPlayedArray[i].toLowerCase(),
      timePlayed: timeChampPlayedArray[i],
      playPercentage: percentageChampPlayedArray[i]
    });
  }
  player.name = playerName;
  player.stats.damage.avgPerTenMin = scrapedNumbersStats10MinArray[0];
  player.stats.healing.avgPerTenMin = scrapedNumbersStats10MinArray[1];
  player.stats.finalBlows.avgPerTenMin = scrapedNumbersStats10MinArray[2];
  player.stats.eliminations.avgPerTenMin = scrapedNumbersStats10MinArray[3];
  player.stats.deaths.leagueRank = scrapedNumbersStats10MinArray[4];
  player.stats.damage.leagueRank = numbersStatsLeagueRankArray[0];
  player.stats.healing.leagueRank = numbersStatsLeagueRankArray[1];
  player.stats.finalBlows.leagueRank = numbersStatsLeagueRankArray[2];
  player.stats.eliminations.leagueRank = numbersStatsLeagueRankArray[3];
  player.stats.deaths.leagueRank = numbersStatsLeagueRankArray[4];
  
  player.stats.chars = charArr;
  
  for (let key in player.stats.chars) {
    //console.log(key);
    charArr.forEach((char) => {
      //console.log(char.name);
      (char.name === 'soldier: 76') ? char.name = 'soldier76' : null;
      if (key === char.name) {
        player.stats.chars[key].timePlayed = char.timePlayed;
        player.stats.chars[key].playPercentage = char.playPercentage;
      }
    });
  }
  console.log('test ' + JSON.stringify(player));
  return player;
};

exports.akshonMatchTeam = () =>{
  ///////helpers////////////////
  util.setScrapeSource('./scrapeExamples/akshon.js');
  let matchDiffPos = util.scrapeData('.border-right.positive > span', null);
  let matchDiffNeg = util.scrapeData('.border-right.negative >span', null);
  let mapDiffPos = util.scrapeData('.positive:not(.border-right) > span',null);
  let mapDiffNeg = util.scrapeData('.negative:not(.border-right) > span',null);
  let totalGames = '40';

  //////variables///////////////
  let teams = util.scrapeData('.full-name',null);
  let matchDiff = matchDiffPos.concat(matchDiffNeg);
  let matchWinArr = [];
  for (let i = 0; i<matchDiff.length; i++){
    let matchWin = totalGames- (totalGames-(matchDiff[i])) / 2;
    matchWinArr.push(matchWin)
  }
  let matchLossArr = [];
  for (let i = 0; i<matchDiff.length; i++){
    let matchLoss = (totalGames-(matchDiff[i])) / 2;
    matchLossArr.push(matchLoss)
  }
  let matchMapDiff = mapDiffPos.concat(mapDiffNeg);
}


