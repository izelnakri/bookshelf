var express = require('express');
var pug = require('pug');
var app = express();

var dataInMemory = [];
dataInMemory.push({
  title: 'JavaScript: The Good Parts',
  slug: 'javascript-the-good-parts',
  imageURL: 'http://t3.gstatic.com/images?q=tbn:ANd9GcSImG75al3b5hNMVAS4IcSUvYmIlMlGw-38ZsZR9rgg4JGz5wxW',
  authorName: 'Douglas Crockford',
  description: "Most programming languages contain good and bad parts, but JavaScript has more than its share of the bad, having been developed and released in a hurry before it could be refined. This authoritative book scrapes away these bad features to reveal a subset of JavaScript that's more reliable, readable, and maintainable than the language as a whole—a subset you can use to create truly extensible and efficient code.",
  numberOfPages: 176
});
dataInMemory.push({
  title: 'The Little Prince',
  slug: 'the-little-prince',
  imageURL: 'https://upload.wikimedia.org/wikipedia/en/0/05/Littleprince.JPG',
  authorName: 'Antoine de Saint-Exupéry',
  description: "Few stories are as widely read and as universally cherished by children and adults alike as The Little Prince. Richard Howard's translation of the beloved classic beautifully reflects Saint-Exupéry's unique and gifted style. Howard, an acclaimed poet and one of the preeminent translators of our time, has excelled in bringing the English text as close as possible to the French, in language, style, and most important, spirit. The artwork in this edition has been restored to match in detail and in color Saint-Exupéry's original artwork. Combining Richard Howard's translation with restored original art, this definitive English-language edition of The Little Prince will capture the hearts of readers of all ages.",
  numberOfPages: 96
});
dataInMemory.push({
  title: 'Europe on a Shoestring',
  slug: 'europe-on-a-shoestring',
  imageURL: 'https://assetscdn.paytm.com/images/catalog/product/9/97/9781741796766_191287/0x1920/70/0.jpg',
  authorName: 'Lonely Planet',
  description: "Lonely Planet Europe on a shoestring is your passport to the most relevant, up-to-date advice on what to see and skip, what hidden discoveries await you, and how to optimise your budget. Tour French chateaux, take boat trips to Greek beaches, hike past Bulgarian monasteries and glug Spanish wine; all with your trusted travel companion. Get to the heart of Europe and begin your journey now!",
  numberOfPages: 1264
});
dataInMemory.push({
  title: 'Security Analysis',
  slug: 'security-analysis',
  imageURL: 'https://hbcumoney.files.wordpress.com/2014/08/security-analysis.gif',
  authorName: 'Benjamin Graham',
  description: "First published in 1934, Security Analysis is one of the most influential financial books ever written. Selling more than one million copies through five editions, it has provided generations of investors with the timeless value investing philosophy and techniques of Benjamin Graham and David L. Dodd.",
  numberOfPages: 700
});

function findBook(slug) {
  // iterate through the array as soon as ('books/' + slug) is the permalink
  // of the book in the loop return the book
  for (var i = 0; i < dataInMemory.length; i++) {
    if (dataInMemory[i].slug === slug) {
      return dataInMemory[i];
    }
  }
}

// lets us access files inside the public folder via http:
app.use(express.static('public'));

app.get('/', function(request, response) {
  response.redirect('/books');
});

app.get('/books', function(req, res) {
  console.log('Requesting /books');
  res.send(pug.renderFile('views/index.pug', { books: dataInMemory }));
});

app.get('/books/*', function(req, res) {
  var foundBook = findBook(req.params[0]);
  res.send(pug.renderFile('views/book.pug', { book: foundBook }));
});

app.listen(3001, function() {
  console.log('Web server is now running on port 3001');
});
