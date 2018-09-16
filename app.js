const request = require('request');
const fakeUa = require('fake-useragent');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');


// const $ = cheerio.load('');

// $('h2.title').text('Hello there!');
// $('h2').addClass('welcome');

// $.html();

let team = require('./models/team.js');
let url = 'https://overwatchleague.com/en-us/players/4142/agilities';
let url1 = 'https://www.overbuff.com/esports'; //https://masteroverwatch.com/news/107-how-to-pick-your-overwatch-league-team
let url2 = 'https://overwatchleague.com/en-us/stats'; // you can change to EU and asia i presume
let url3 = 'https://overwatchleague.com/en-us/players/4652/ark';// recent matches
let verb = 'get';

async function getPic() {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitFor(3000);
  await page.click('.Button--secondary');
  await page.waitFor(2000);
  console.log(await page.content());
  // await page.screenshot({path: 'google.png'});
  
  await browser.close();
}

getPic();



//
// request.get(params, (err, req, body) => { //todo fake the header
//   console.log(body);
//   // console.log(req);
// });
