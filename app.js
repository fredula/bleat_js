var express = require('express');
var app = express(); 
var bodyParser = require('body-parser');
var tweetArray = ['Blah, blah blacksheep', 
				  'You\'re the blacksheep in the family...',
				  'You need to be shorn.',
				  'You look rather sheepish today...'];

var bleats = [	{text: tweetArray[Math.floor(Math.random()*4)], time: new Date().getTime()-123000},
				{text: tweetArray[Math.floor(Math.random()*4)], time: new Date().getTime()-8900},
				{text: tweetArray[Math.floor(Math.random()*4)], time: new Date().getTime()}];

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/ajax', function(req, res){
	res.type('json');
	res.end(JSON.stringify({bleats: bleats}));
})

app.post('/sendata', function(req, res){
	//console.log(req.body.textValue);
	res.type('json');
	res.end(JSON.stringify({bleat: req.body.textValue,
							time: new Date().getTime()}));
})

var server = app.listen(8080);