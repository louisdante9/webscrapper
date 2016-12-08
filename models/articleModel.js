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
	},
	story: {
		type: String,
		trim: true
	}, 
	notes: [{
    type: Schema.Types.ObjectId,
    ref: "Note"
  }]
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

ArticleSchema.methods.retrieveOne = function(res, articleID) {
	return this.model('Article')
		.find({_id: articleID})
		.exec(function(err, data) {
		if(err) {
			console.log(err);
		} else {
			console.log(data);
			res.render('article.hbs', {article: data[0]});
		}
	});
};

// ArticleSchema.methods.findOneUpdate = function(req, res, article, note) {
// 	return article.update({_id: req.query.articleID}, {$push: {"notes": note}})
// 	.exec(function(err, data) {
// 		console.log('article exec fired');
// 		console.log(data);
// 		res.render('article.hbs', {article: data[0]});
// 	});
// };



var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;