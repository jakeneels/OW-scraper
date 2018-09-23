'use strict';
let player = require('./models/player.js');
let team = require('./models/team.js');

let scrape = require('./scrape.js');
let team =require('./models/team.js');

let scrapeData = scrape.winstonCharPlayer();
 scrapeData = scrape.olCharPlayer();
 // scrapeData = scrape.akshonMatchTeam();

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




