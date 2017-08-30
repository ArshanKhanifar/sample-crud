const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const config = {
	mongodb: 'mongodb://arshankhanifar:Physics92@ds115214.mlab.com:15214/star-wars-quotes'
}
var db;

MongoClient.connect(config.mongodb, (err, database) => {
	if (err) return console.log('got err\n', err);
	db = database;
	app.listen(3000, () => {
		console.log('listening on 3000');
	});
});

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.get('/arshanpage', (req, res) => {
	res.render('whatsup', {title: 'arshan page title shii', message: "Hey what's up?"});
});

app.get('/', (req, res) => {
	var cursor = db.collection('quotes').find().toArray((err, result) => {
		if (err) return console.log(err)
		res.render('index', {quotes: result});
	});
})

app.post('/quotes', (req,res) => {
	db.collection('quotes').save(req.body, (err, result) => {
		if (err) return console.log(err);
		console.log('saved to database')
		res.redirect('/')
	});
});


