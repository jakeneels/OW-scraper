const cheerio = require('cheerio');

const puppeteer = require('puppeteer');
let fs = require('fs');
let html;
let $;

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

exports.getSourceCode = async (config) => {
  
  let url = config.url;
  
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  
  await page.goto(url, {waitUntil: 'networkidle2'});
  await page.waitFor(1000);
  // await page.click('.Button--secondary');
  let content = await page.content();
  
  fs.writeFile("./AKSHON.html", content, function (err) {
    if (err) {
      return console.log(err);
    }
    
  });
  
  await browser.close();
};

