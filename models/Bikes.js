const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BikeSchema = new Schema({

	link: {
		type: String,
		unique: true
	},
	text: {
		type: String,
		unique: true
	},
	image: {
		type: String,
		unique: true
	},
	price: String,
	comments: [String],
	rating: [Number],
	category: String

});

const Bikes = mongoose.model('Bikes', BikeSchema);

module.exports = Bikes;
