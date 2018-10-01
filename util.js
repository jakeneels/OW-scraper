'use strict';
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
let fs = require('fs');
let html;
let $;

/*
set source code for scrape element*/
exports.setScrapeSource = (source) => {
  html = require(source);
  $ = cheerio.load(html);
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
  if (url.includes('https://overwatchleague.com/en-us/players/')) {
    method = 'olPlayer';
  } else if (url.includes('sdafdff')) {
    method = 'winstonPlayer';
  } else {
    method = 'default';
  }
  
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle2'});
  await page.waitFor(1000);
  
  // switch (method){
  //   case 'olPlayer':
  //     await page.click('.Button--secondary');
  //     await page.waitFor(3000);
  //     break;
  //   case 'winstonPlayer':
  //
  //     break;
  // }
  
  let content = await page.content();
  //fs.writeFile("./AKSHON.html", content, function (err) {
  //  if (err) {
  //    return console.log(err);
  //  }//
  //
  //});
  await browser.close();
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



