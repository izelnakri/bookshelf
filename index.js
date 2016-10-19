var express = require('express');
var pug = require('pug');
var app = express();

// lets us access files inside the public folder via http:
app.use(express.static('public'));

app.get('/', function(request, response) {
  response.redirect('/books');
});

app.get('/books', function(req, res) {
  console.log('Requesting /books');
  res.sendFile(__dirname + '/index.html');
});

app.get('/books/*', function(req, res) {
  res.sendFile(__dirname + '/' + req.params[0] + '.html');
});

app.listen(3001, function() {
  console.log('Web server is now running on port 3001');
});
