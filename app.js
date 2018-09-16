const cheerio = require('cheerio');
//const puppeteer = require('puppeteer');


let team = require('./models/team.js');
let player = require('./models/player.js');
let url = 'https://overwatchleague.com/en-us/players/4142/agilities';
let url1 = 'https://www.overbuff.com/esports'; //https://masteroverwatch.com/news/107-how-to-pick-your-overwatch-league-team
let url2 = 'https://overwatchleague.com/en-us/stats'; // you can change to EU and asia i presume
let url3 = 'https://overwatchleague.com/en-us/players/4652/ark';// recent matches
let verb = 'get';

// async function getPic() {
//   const browser = await puppeteer.launch({headless: false});
//   const page = await browser.newPage();
//   await page.goto(url);
//   await page.waitFor(3000);
//   await page.click('.Button--secondary');
//   await page.waitFor(2000);
//   console.log(await page.content());
//   // await page.screenshot({path: 'google.png'});
//
//   await browser.close();
// }

// getPic();
let html = require('./scrapeExamples/example.js');

///////////get the html///////////
const $ = cheerio.load(html);
//////////////////////////////////

//classes
let statsOverviewTitle = '.Table-header--compact';
let percentPlayed = '.Table-data--emphasized';
let uTextRight = '.u-text-right';

//selectors
let selNames = '.Table-data--extended';
let selTimePlayed = `.u-text-right:not(${statsOverviewTitle}):not(${selNames}):not(${percentPlayed})`;
let selPercentPlayed = `.Table-data--emphasized:not(${statsOverviewTitle})`;


scrapeCharsData(selNames);
scrapeCharsData(selTimePlayed, 's');
scrapeCharsData(selPercentPlayed, '%');

//////////////////scraping function/////////////////////////////
function scrapeCharsData(selector, onlyIncluding) {
  let result = [];
  $(selector).each(function (i, e) {
    let content = e.children[0].data.toLowerCase();
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




