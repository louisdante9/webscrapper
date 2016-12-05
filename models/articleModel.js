const	mongoose = require("mongoose"), 
			express = require('express');

const	app = express();

// Create a Schema class with mongoose
var Schema = mongoose.Schema;

var ArticleSchema = new Schema ({
	title: {
		type: String,
		trim: true,
		unique: true,
		required: "title is required"
	},
	date: {
		type: String,
		trim: true
	},
	link: {
		type: String,
		trim: true,
		unique: true
	}
});

ArticleSchema.methods.retrieveAll = function(res) {
	return this.model('Article').find({}).sort({date: -1}).exec(function(err, data) {
		if(err) {
			console.log(err);
		} else {
			console.log(data);
			res.render('index.hbs', { articles: data});
		}
	});
};

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;