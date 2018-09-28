'use strict';
let player = require('./models/player.js');
let team = require('./models/team.js');
let util = require('./util.js')

let scrape = require('./scrape.js');
// let team =require('./models/team.js');

// util.getSourceCode('https://overwatchleague.com/en-us/players/');

// let scrapeData = scrape.winstonCharPlayer();
//  scrapeData = scrape.olCharPlayer();

let scrapeData = scrape.akshonMatchTeam();
console.log(scrapeData)

// let charArr = [];

 // TODO:match numbersStatsArray with this array to get teach value on it's own.
//let numbersStatsLeagueRankArray = scrapeCharsDataOL('.Table-data.Table-data--emphasized.u-text-right:not(.u-text-nowrap)')

 //console.log(charArr);
// for char per player, will be returned from scrape type function that deal with champ-> player relationship
//for (let key in player.stats.chars) {
  ////console.log(key);
//  charArr.forEach((char) => {
    ////console.log(char.name);
//    (char.name === 'soldier: 76') ? char.name = 'soldier76': null;
//    if (key === char.name) {
//      player.stats.chars[key].timePlayed = char.timePlayed;
//      player.stats.chars[key].playPercentage = char.playPercentage;
//    }
//  });
//}
////console.log(player.stats.chars.genji)



////////////////////////////////////////////////////////////////




