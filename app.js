'use strict';
let player = require('./models/player.js');
let team = require('./models/team.js');
let util = require('./util.js');
// const players = require('./Players.json');
const JsonDB = require('node-json-db');
const db = new JsonDB("Players", true, true);

let scrape = require('./scrape.js');
// let team =require('./models/team.js');

// let scrapeData = scrape.winstonCharPlayer();
 async function main() {
  let scrapeData;
  for (let i = 1; i <= 1; i++) {
     let playerlinks = ['/players/3985/akm'];/* scrape.scrapeOLPlayerLinks(`./players${i}.js`);*/
    
    playerlinks.forEach(async (query) => {

      let code = await util.getSourceCode('https://overwatchleague.com/en-us' + query);
        // console.log(code.substring(0,50));

        // console.log(scrapeData);
          console.log('shis done');
      });
        // setTimeout(()=>{scrapeData =  scrape.olCharPlayer()} ,10000);
  }
}

 main();
// util.getSourceCode('https://overwatchleague.com/en-us/players');


// let scrapeData = scrape.olCharPlayer();
// let playerName = scrapeData.name;
// delete scrapeData.name;



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





