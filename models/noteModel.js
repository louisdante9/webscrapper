const	mongoose = require("mongoose"), 
			express = require('express');

const	app = express();

// Create a Schema class with mongoose
var Schema = mongoose.Schema;

var NoteSchema = new Schema ({
	username: {
		type: String,
		trim: true,
		unique: false
	},
	q1: {
		type: String,
		trim: true
	},
	a1: {
		type: String,
		trim: true
	},
	q2: {
		type: String,
		trim: true
	},
	a2: {
		type: String,
		trim: true
	},
	q3: {
		type: String,
		trim: true
	},
	a3: {
		type: String,
		trim: true
	},
	articleID: {
		type: Schema.Types.ObjectId,
		ref: "Article"
	},
	created: {
		type: Date,
		default: Date.now
	}

});

NoteSchema.methods.saveNote = function(res, articleID) {
	return this.model('Article')
		.save(function(err, data) {
			if(err) {
				console.log(err);
			} else {
				console.log(data);
			}
		});
};

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;