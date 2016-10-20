var express = require('express');
var pug = require('pug');
var fs = require('fs');

var app = express();

var dataInMemory = JSON.parse(fs.readFileSync('data.json').toString())['books'];

function findBook(slug) {
  // iterate through the slugs in the array of object
  // if the iterated object holds the same slug as the parameter of this function return the object
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
