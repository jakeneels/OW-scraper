'use strict';
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
let fs = require('fs');
let html;
let $;
let scrape = require('./scrape.js');

const JsonDB = require('node-json-db');
const db = new JsonDB("Players", true, true);

/*
set source code for scrape element*/
exports.setScrapeSource = (source) => {
  html = require(source);
  $ = cheerio.load(html);
};

function setScrapeSource(source) {
  $ = cheerio.load(source);
};


exports.scrapeData = function scrapeData(selector, onlyIncluding) {
  let playerStatArray = [];
  $(selector).each((i, e) => {
    let content = e.children[0].data;
    
    let push = true;
    if (content !== undefined) {
      
      if (onlyIncluding != null) {
        push = false;
        if (typeof onlyIncluding === 'object') {
          onlyIncluding.forEach(req => {
            content.includes(req) ? push = true : null;
          })
        } else if (content.includes(onlyIncluding)) {
          push = true
        }
      }
      push ? playerStatArray.push(content) : null;
    }
  });
  console.log(playerStatArray);
  //console.log(playerStatArray);
  return playerStatArray;
};

/*
get source code from website through puppeteer browser
*/
exports.getSourceCode = async (url) => {
  let method;
  let content;
  if (url === 'https://overwatchleague.com/en-us/players') {
    method = 'olGetAllPlayerLinks';
  } else if (url.includes('https://overwatchleague.com/en-us/players/')) {
    method = 'olPlayer';
  } else if (url.includes('sdafdff')) {
    method = 'winstonPlayer';
  } else {
    method = 'default';
  }
  
  const browser = await puppeteer.launch({headless: false});
  
  
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle2', timeout: 3000000});
  
  switch (method) {
    
    case 'olPlayer':
      await page.click('.Button--secondary');
      console.log('clicked button::: ');
      
      await page.waitFor(500);
      console.log('waited 500 ');
      content = await page.content();
      console.log('got page content::: ');
      break;
      
    case 'winstonPlayer':
      break;
      
    case 'olGetAllPlayerLinks':
      // for (let i = 1; i <= 4; i++) { // todo cannot select the next page atm
      //   await page.waitFor(1000);
      //   await page.goto(url, {waitUntil: 'networkidle2'});
      //   await page.waitFor(5000);
      //   await page.click(`#stats > div > div > div:nth-child(2) > div.u-verticalMargin--small > div > nav > ul > li:nth-child(3)`);
      //   console.log('clik');
      //   await page.waitFor(1000);
      //   let con = await page.content();
      //   fs.writeFile(`./players${i}.html`, con, function (err) {});
      // }
      break;
  }
  
  
  await browser.close();
  console.log('closed browser::: ');
  await setScrapeSource(content);
  console.log(content.substring(0,99));
  let scrapeData = await scrape.olCharPlayer();
  console.log('Scrape DATA $%$%');
   db.push("/" + scrapeData.name , scrapeData, false);
  return content;
};

/*
scraping function*/
// exports.scrapeData = function scrapeData(selector, onlyIncluding) {
//   let result = [];
//   $(selector).each(function (i, e) {
//     let content = e.children[0].data;
//     if (content != undefined) {
//       if (onlyIncluding != null) {
//         if (content.includes(onlyIncluding)) {
//           result.push(content);
//         }
//       } else {
//         result.push(content);
//       }
//     }
//   });
//   console.log(result);
//   return result;
// };



