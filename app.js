const cheerio = require('cheerio');
//const puppeteer = require('puppeteer');


// let team = require('./models/team.js');
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

const $ = cheerio.load(html);

// console.log(
//   $('.Table-data--extended').text() + '\n'
// );4
let ghostWords = ['time played', '% played'];
let statsOverviewTitle = '.Table-header--compact';
let percentPlayed = '.Table-data--emphasized';
let uTextRight = '.u-text-right';

//selectors
let selNames = '.Table-data--extended';
let selTimePlayed = `.u-text-right:not(${statsOverviewTitle}):not(${selNames}):not(${percentPlayed})`;
let selPercentPlayed = `.Table-data--emphasized:not(${statsOverviewTitle})`;


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
    if (key == char.name) {
      player.stats.chars[key].timePlayed = char.timePlayed;
      player.stats.chars[key].playPercentage = char.playPercentage;
    }
  }) // todo soldir 69 fix
}
console.log(player.stats.chars);
console.log(('25m 7s' < '0h 0m 0s'));



timePlayed.forEach((time) => {
  Object.keys(player.stats.chars).forEach((charName) => {
  
  });
});


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


//
// request.get(params, (err, req, body) => { //todo fake the header
//   console.log(body);
//   // console.log(req);
// });
