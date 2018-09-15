
const request = require('request');
const fakeUa = require('fake-useragent');
const cheerio = require('cheerio');
// const $ = cheerio.load('');

// $('h2.title').text('Hello there!');
// $('h2').addClass('welcome');
//
// $.html();

let url = 'https://www.winstonslab.com/teams/team.php?id=328';
let url1 = 'https://www.overbuff.com/esports'; //https://masteroverwatch.com/news/107-how-to-pick-your-overwatch-league-team
let url2 = 'https://overwatchleague.com/en-us/stats'; // you can change to EU and asia i presume
let url3 = 'https://overwatchleague.com/en-us/players/4652/ark';// recent matches
let verb = 'get';

let params = {
  url,
  headers: ''
};

request.get(params, (err, req, body) => { //todo fake the header
  console.log(body);
  // console.log(req);
});
