const request = require('request');
const fakeUa = require('fake-useragent');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');


let team = require('./models/team.js');
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
console.log('.Table-data--extended',);
console.log(
  $('.Table-data--extended').text() + '\n'
);
console.log(
  $('.u-text-right').text() + '\n'
);


$.html();


//
// request.get(params, (err, req, body) => { //todo fake the header
//   console.log(body);
//   // console.log(req);
// });
