'use strict';
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
let fs = require('fs');
let html;
let $;
//////////////////////cheerio
/////////////////////////////
exports.setScrapeSource = (source) => {
  html = require(source);
  $ = cheerio.load(html);
};

exports.scrapeData = function scrapeData(selector, onlyIncluding) {
  
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
  //console.log(playerStatArray);
  return playerStatArray;
};


exports.getSourceCode = async (url) => {
  let method;
  if        (url.includes('https://overwatchleague.com/en-us/players/'))  {
    method = 'olPlayer';
  } else if (url.includes('sdafdff')) {
    method = 'winstonPlayer';
  }else{
    method = 'default';
  }
  
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle2'});
  await page.waitFor(1000);
  
  switch (method){
    case 'olPlayer':
      await page.click('.Button--secondary');
      await page.waitFor(3000);
      break;
    case 'winstonPlayer':
      
        return;
  }

  let content = await page.content();
  console.log(content);
  //
  //fs.writeFile("./AKSHON.html", content, function (err) {
  //  if (err) {
  //    return console.log(err);
  //  }//
    //
  //});
  
  await browser.close();
  return content;
};


///////////scraping function
//////////////////////////
exports.scrapeData = function scrapeData(selector, onlyIncluding) {
  let result = [];
  $(selector).each(function (i, e) {
    let content = e.children[0].data;
    if (content != undefined) {
      if (onlyIncluding != null) {
        if (content.includes(onlyIncluding)) {
          result.push(content);
        }
      } else {
        result.push(content);
      }
    }
  });
  console.log(result);
  return result;
};



