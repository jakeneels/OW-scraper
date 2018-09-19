const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
let fs = require('fs');

// let team = require('./models/team.js');
let player = require('./models/player.js');
let url = 'https://overwatchleague.com/en-us/players/4142/agilities';
let url2 = 'https://www.winstonslab.com/customquery/comparePlayers/?dateGreater=2018-05-01&dateSmaller=2018-09-01&event%5B%5D=86&specificMatchupTeam1=0&specificMatchupTeam2=0&team%5B%5D=&player%5B%5D=&time=0&alloreach=2&maptype%5B%5D=&map%5B%5D=&roundtype%5B%5D=&statsBy=1&heroes=';
let url1 = 'https://www.overbuff.com/esports'; //https://masteroverwatch.com/news/107-how-to-pick-your-overwatch-league-team
let verb = 'get';

async function pullFromOWLeaguePlayerPage() {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  
  await page.goto(url2, {waitUntil: 'networkidle2'});
  await page.waitFor(200000);
  // await page.click('.Button--secondary');
  let content = await page.content();
  
  fs.writeFile("./OLPlayers.html", content, function (err) {
    if (err) {
      return console.log(err);
    }
    
    console.log("The file was saved!");
  });
  // await page.screenshot({path: 'google.png'});
  
  await browser.close();
}

// pullFromOWLeaguePlayerPage();
//
// let html = require('./scrapeExamples/example.js');
//
// ///////////get the html///////////
// const $ = cheerio.load(html);
// //////////////////////////////////
//
// //classes
// let statsOverviewTitle = '.Table-header--compact';
// let percentPlayed = '.Table-data--emphasized';
// let uTextRight = '.u-text-right';
let tablePages = '.table-page1, .table-page2, .table-page3, .table-page4, .table-page5, .table-page6';

// //selectors
// let selNames = '.Table-data--extended';
// let selTimePlayed = `.u-text-right:not(${statsOverviewTitle}):not(${selNames}):not(${percentPlayed})`;
// let selPercentPlayed = `.Table-data--emphasized:not(${statsOverviewTitle})`;
let selheroWinPercentage = `.hero-winrate :not(${tablePages})`;

let charArr = [];
let tempChar = {};
let charNames = scrapeCharsData(selNames);
let timePlayed = scrapeCharsData(selTimePlayed, 's');
let percentPlayedstat = scrapeCharsData(selPercentPlayed, '%');


for (let i = 0; i < charNames.length; i++) {
  charArr.push({
    name: charNames[i],
    timePlayed: timePlayed[i],
    playPercentage: percentPlayedstat[i]
  });

  // console.log(charArr)
}
for (let key in player.stats.chars) {
  // console.log(key);
  charArr.forEach((char) => {
    console.log(char.name);
    (char.name === 'soldier: 76') ? char.name = 'soldier76': null;
    if (player.stats.chars.hasOwnProperty(key) && key === char.name) {
      player.stats.chars[key].timePlayed = char.timePlayed;
      player.stats.chars[key].playPercentage = char.playPercentage;
    }
  });
}
// console.log(player.stats.chars);
// console.log(('25m 7s' < '0h 0m 0s'));
//
// timePlayed.forEach((time) => {
//   Object.keys(player.stats.chars).forEach((charName) => {
//
//   });
// });
//
let html = require('./scrapeExamples/winston.js');
//
// ///////////get the html///////////
const $ = cheerio.load(html);
//////////////////scraping function/////////////////////////////
//this is jquery you can google selectors
//let charNameArray = scrapePlayerDataWinston('.hero-name > span', null);
//let playerNameArray = scrapePlayerDataWinston('.hero-player > a', null);
//let heroWinPercentageArray = scrapePlayerDataWinston(('.hero-winrate.positive,.hero-winrate.negative'), null); // win rate = timewWon/timePlayed
//let needsFix1 = scrapePlayerDataWinston('td.table-page1','%') //TODO: take each 3rd element and push it in another array
                                      //teamKillsPercentageArray = needsFix1[0]
                                      //teamDeathsPercentage = needsFix[1]
                                      //garbage1 = needsFix[3]
let needsFix2 = scrapePlayerDataWinston('.table-avg10.table-page1', null); // TODO:take each 3rd element and push it in another array
                                      //killsAvgPer10 = needsFix2[0]
                                      //deathsAvgPer10 = needsFix2[1]
                                      //killsDividedByDeaths = needsFix2[2]
                                      //

//console.log(playerNameArray);
//console.log("\n\n\n\n\n\n\n\n\n\n\n");
//console.log(charNameArray);
//console.log("\n\n\n\n\n\n\n\n\n\n\n");
//console.log(heroWinPercentageArray); TODO:figure out why heroWinPercentage misses one element


function scrapePlayerDataWinston(selector, onlyIncluding ) {
  let playerStatArray = [];
  $(selector).each(function (i, e) {
    let content = e.children[0].data;
    if (content != undefined) {
      if (onlyIncluding != null) {
        if (content.includes(onlyIncluding)) {
          playerStatArray.push(content);
        }
      } else {
        playerStatArray.push(content);
      }
    }
  });
  console.log(playerStatArray);
  return playerStatArray;
}

function scrapeCharsDataOL(selector, onlyIncluding) {
  let result = [];
  $(selector).each(function (i, content) {
    let content = content.children[0].data.toLowerCase();
    if (onlyIncluding != null) {
      if (content.includes(onlyIncluding)) {
        result.push(content);
    }
    } else {
      result.push(content);
    }
  });
  console.log(result);
  return result;
}

////////////////////////////////////////////////////////////////




