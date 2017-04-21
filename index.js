var express = require('express')
  , jsdom = require('jsdom')
  , request = require('request')
  , url = require('url')
  , http = require('http')
  , path = require('path')
;

var app = express();

app.set('port', (process.env.PORT || 5000));

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

app.get('/stats', function(req, res) {
  //Tell the request that we want to fetch youtube.com, send the results to a callback function
  request({uri: 'https://soundcloud.com/listentoapril'}, function(err, response, body){
    var self = this;
		self.items = new Array(); //I feel like I want to save my results in an array

		//Just a basic error check
    if(err && response.statusCode !== 200) {
      console.log('Request error.');
    }
    //Send the body param as the HTML code we will parse in jsdom
		//also tell jsdom to attach jQuery in the scripts and loaded from jQuery.com
		jsdom.env({
      html: body,
      scripts: ['http://code.jquery.com/jquery-1.6.min.js'],
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
      },
      done: function(err, window) {
        //Use jQuery just as in a regular HTML page
        var $ = window.jQuery;

        console.log(body)

        console.log('hello');
        console.log('hey', $('.profileHeaderInfo__userName').text())
        //response.end($('.profileHeader__edit').text());
      }
    });
  });

  //response.render('pages/stats');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
