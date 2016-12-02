const	express = require("express"),
		bodyParser = require("body-parser"),
		logger = require("morgan"),
		mongoose = require("mongoose");
// Mongoose mpromise deprecated - use bluebird promises
var Promise = require("bluebird");

mongoose.Promise = Promise;

var app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
app.use(express.static("public"));


// Database configuration with mongoose
mongoose.connect("mongodb://localhost/kos_scrape_db");
var db = mongoose.connection;

//MONGODB_URI as => mongolab-polished-17211
//MONGODB_URI is mongodb://heroku_z3vrnqqn:u5ah129tbdnucvkud7ksra1ika@ds119718.mlab.com:19718/heroku_z3vrnqqn -- paste as argument into mongoose.connect() function

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'hbs');






/* 

to do:

1.  scrape dailykos titles and dates and save articles to mongo. -- friday
2.  prevent saving of duplicate titles and dates.  -- saturday
3.  write basic first page front end to call articles documents and display titles to choose from. -- saturday
4.  write bad dummy front end to enter a single text comment displayed with the title that it's about from the first call. -- sunday
5.  push more than one note to notes collection with the object id of the title. -- sunday
6.  retrieve notes for an article on click with the bad dummy front end. -- monday
7.  add questions to notes and retrieve more complicated notes.  push questions and answers to the same notes (embed). -- tuesday/wednesday
8.  write handlebars front end and make handlebars actually display the mongoose data -- wednesday-saturday




Pseudocode:

concept for the site:  what do you think?  comment on how the news is reported.   

on load scrape dailykos.com for titles, links to dailykos comments, full text, byline, date, and main images,  storing that to mongo db in the articles collection.  The server starts by scraping just the titles and dates to the article documents to get a fully functional app before adding details.  If the title and date match an entry already in the articles collection, the article isn't saved.

basic functionality is to save a note that is a single line of text into the notes collection and populate notes to the article by saving the object id of the article into the notes that are associated with it.

extended functionality is to ask a single set of 3 questions to each user about the news article that they are reading, plus their name and a timestamp.

more extended functionality is to create a login for each user in a users collection and have the user object id associated with each note and the note id concatenated with a comment number associated with each user in an array.    make timestamps of comments match the format of timestamps of articles.  I definitely won't get to this.

On the main page, handlebars, mongoose and a forEach iterate over the titles stored in the articles collection in reverse chronological order.

on click, handlebars and mongoose find one uses a different view to display the single article text and hard code the opinion entry field.

popup handled by remodal.  if login popup use remodal also.


three questions: brainstorm when the basic functionality is complete.

design inspiration: modern old newspaper showing monochrome headlines in Times with a ye olde title font in four columns with rollover in color that changes the font of the article to sans-serif and the header of the site to color and a modern font.  Click on a headline and it flies to the upper left still in 1/4.  Comments section is in a 1/4 column under the headline, with a view all opinions button under the submit button that toggles the opinions popup.  article displays in the right 3/4 column.  submit your opinion and a pop-up displays all opinions.  
 */