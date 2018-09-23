'use strict';
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
let team = require('./models/team.js');
console.log(team.name);
//////////////SCRAPE AKSHON//////////////////////
///////////get the html///////////
let html = require('./scrapeExamples/akshon.js');
const $ = cheerio.load(html);
////////////////pupeteer/////////
//pullFromURL()

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
//console.log(teams);
let matchDiff = matchDiffPos.concat(matchDiffNeg);
 // console.log(matchDiff);
let matchWinArr = [];
for (let i = 0; i<matchDiff.length; i++){
  let matchWin = totalGames- (totalGames-(matchDiff[i])) / 2;
  matchWinArr.push(matchWin)
}
//console.log(matchWinArr);
let matchLossArr = [];
for (let i = 0; i<matchDiff.length; i++){
  let matchLoss = (totalGames-(matchDiff[i])) / 2;
  matchLossArr.push(matchLoss)
}
//console.log(matchLossArr);
let mapDiff = mapDiffPos.concat(mapDiffNeg); //diff = win - loss => teh bigger the number,the less the losses.
//console.log(mapDiff);
//////////////////






///////////scraping function
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