const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
	name: {type: String, minlength: '2', require: true},
	email: {type: String, minlength: '4', require: true, unique: true},
	password: {type:String, minlength: '7', require: true},
	cars: [{type: Schema.Types.ObjectId, ref: 'Car'}]
}, {timestamps:true});

mongoose.model('User', userSchema);
