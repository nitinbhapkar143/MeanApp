var express = require('express');
var morgan  = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var router = express.Router();
var appRoute = require('./app/routes/api')(router);
mongoose.Promise = global.Promise;

var app = express();
var port = process.env.port || 3000;

mongoose.connect('mongodb://localhost:27017/appData', function(err){
	if(err){
		console.log('Error : ', err.message);
	}
	else{
		console.log('Connected to database');
	}
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use('/api', appRoute);


app.get('*',function(req, res){
	res.sendFile(path.join(__dirname, '/public/views/index.html'));
});

app.listen(port, function (err) {
	if(err) throw err;
	console.log('Listening on http://locahost:' + port);
});
