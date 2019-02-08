const	express = require("express"),
			bodyParser = require("body-parser"),
			logger = require("morgan"),
			mongoose = require("mongoose"),
			request = require("request"),
			cheerio = require("cheerio"),
			dotenv = require('dotenv'),
			exphbs = require('express-handlebars'); 
			PORT = process.env.PORT || 3000;
			jquery = require('jquery');
			dotenv.config();

		// return console.log(process.env.MONGO_URI_DEV, 'hello there!')

var	Article = require('./models/articleModel.js'),
	Note = require('./models/noteModel.js');
var Promise = require("bluebird");

mongoose.Promise = Promise;

var app = express();

app.engine('hbs', exphbs({ 
  extname: 'hbs', 
  defaultLayout: 'main', 
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'handlebars');


app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static("public"));

const dbName = 'newscraper'
const dbOptions = {
  useNewUrlParser: true,
  dbName,
  connectTimeoutMS: 1000,
  socketTimeoutMS: 45000,
  poolSize: 10,
  useMongoClient: true 
};

mongoose.connect(encodeURI(process.env.MONGO_URI_DEV),  dbOptions, (err)=> {
  !err ? console.log('Database connected') : console.log('error occured ',err)
})


request("http://www.dailykos.com", function(error, response, html) {

  // Load the HTML into cheerio
  var $ = cheerio.load(html);

  // Make an empty array for saving our scraped info
  // var result = [];

  // With cheerio, look at each award-winning site, enclosed in "figure" tags with the class name "site"
  $(".story").each(function(i, element) {

  	var title = $(element).find(".story-title.heading").children("a").first().text();
  	var date = $(element).find(".author-date.visible-sm-block").children("span.timestamp").first().text();
    var link = $(element).find(".story-title.heading").children("a").first().attr("href");
    var paragraph = $(element).find(".story-intro").find("p").first().text();

    var newArticle = new Article({
    	title,
     	date,
     	link: `http://www.dailykos.com${link}`,
     	story: paragraph
    });

    newArticle.save(function(err, data) {
    	if(err) {
    		console.log("newarticle save error is " + err);
    	} else {
    		console.log(data);
    	}
    });
  }); //cheerio each
});//request

app.get('/', function(req, res) {
	var article = new Article(req.query);
	article.retrieveAll(res);
});

app.get('/detail', function(req, res) {
	var article = new Article(req.query);
	article.retrieveOne(req, res);


});

app.get('/submit', function(req, res) {
	var note = new Note(req.query);
	console.log('note instance ' + note);
	note.saveNote(req, res, Article, note);
});

app.get('/shownotes', function(req, res) {
	var article = new Article(req.query);
	article.viewNotes(req, res, Note, article);
});

app.listen(PORT, function() {
	console.log('app listening on port ' + PORT);
});

