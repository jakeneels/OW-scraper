'use strict';
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
let fs = require('fs');
let url = 'https://www.akshonesports.com/tournaments/owleague/standings/league';
let team = require('./models/team.js');
console.log(team.name);
//////////////SCRAPE AKSHON//////////////////////
///////////get the html///////////
let html = require('./scrapeExamples/akshon.js');
const $ = cheerio.load(html);
////////////////pupeteer/////////
//pullFromURL()
async function pullFromURL() {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  
  await page.goto(url, {waitUntil: 'networkidle2'});
  await page.waitFor(200000);
  // await page.click('.Button--secondary');
  let content = await page.content();
  
  fs.writeFile("./AKSHON.html", content, function (err) {
    if (err) {
      return console.log(err);
    }
    
    // console.log(content);
  });
  // await page.screenshot({path: 'google.png'});
  
  await browser.close();
}

///////helpers
////////////////
let matchDiffPos = scrapeAkshon('.border-right.positive > span', null);
let matchDiffNeg = scrapeAkshon('.border-right.negative >span', null);
let mapDiffPos = scrapeAkshon('.positive:not(.border-right) > span',null);
let mapDiffNeg = scrapeAkshon('.negative:not(.border-right) > span',null);
let totalGames = '40';

//////variables
///////////////
let teams = scrapeAkshon('.full-name',null);
let matchDiff = matchDiffPos.concat(matchDiffNeg);
let matchWinArr = [];
for (let i =0;i<matchDiff.length;i++){
  let matchWin = totalGames- (totalGames-(matchDiff[i])) /2
  matchWinArr.push(matchWin)
}
let matchLossArr = [];
for (let i =0;i<matchDiff.length;i++){
  let matchLoss = (totalGames-(matchDiff[i])) /2
  matchLossArr.push(matchLoss)
}
let mapDiff = mapDiffPos.concat(mapDiffNeg)//diff = win - loss => the bigger the number,the less the losses.

//////////////////logs
//////////////////////
console.log(teams);
console.log(matchDiff);
console.log(matchWinArr);
console.log(matchLossArr);
console.log(mapDiff);

//////////////setting the team object
////////////////////////////////////
for (let i = 0; i < championsPlayedArray.length; i++) {
  charArr.push({
    name: teams[i].toLowerCase(),
    timePlayed: matchDiff[i],
    playPercentage: matchWinArr[i],
    smth: matchLossArr[i],
    smth2:mapDiff[i]
  });
}

///////////scraping function
////////////////////////////
function scrapeAkshon(selector, onlyIncluding) {
  let result = [];
  $(selector).each(function (i, content) {
    let content1 = content.children[0].data;
    if (onlyIncluding != null) {
      if (content1.includes(onlyIncluding)) {
        result.push(content1);
      }
    } else {
      result.push(content1);
    }
  });
  //console.log(result);
  return result;
}