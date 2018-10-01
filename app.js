'use strict';
let player = require('./models/player.js');
let team = require('./models/team.js');
let util = require('./util.js');
let scrape = require('./scrape.js');


 async  function main(){
 await util.getSourceCode('https://overwatchleague.com/en-us/players');
   }
   //main();

 //util.getSourceCode('https://overwatchleague.com/en-us/players/');
// let scrapeData = scrape.winstonCharPlayer();
//let scrapeData = scrape.olCharPlayer();
//let scrapeData = scrape.akshonMapTeam();
let scrapeData = scrape.OLTeam();

 util.scrapeOLPlayerLinks();


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





