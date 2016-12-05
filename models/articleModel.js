const	mongoose = require("mongoose");

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

ArticleSchema.methods.retrieveAll = function() {
	return this.model('Article').find({}, function(err, data) {
		if(err) {
			console.log(err);
		} else {
			console.log(data);
		}
	});
};

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;