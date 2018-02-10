const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var carSchema = new mongoose.Schema({
	title: {type: String, require: true},
	description: {type: String, require: true},
	price: {type:Number},
	image: {type:String},
	location: {type:String},
	_user: {type: Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});

mongoose.model('Car', carSchema);
