var express = require('express');

var app = express();


app.set('port', process.env.PORT || 5000);

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/webpack', function(request, response) {
  response.render('pages/webpack');
});

app.get('/css', function(request, response) {
  response.render('pages/css');
});

app.get('/project', function(request, response) {
  response.render('pages/project');
});

app.get('/stats', function(request, response) {
  response.render('pages/stats', {
    SOUNDCLOUD_CLIENT_ID: process.env.SOUNDCLOUD_CLIENT_ID,
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
