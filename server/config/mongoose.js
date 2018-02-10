const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs'); //for loading model files

mongoose.connect('mongodb://localhost/cars_db');
//var that points to the path where all the models live
var model_path = path.join(__dirname, './../models');
//read all of the files in the models_path and require (run) each of the js files
fs.readdirSync(model_path).forEach((file)=>{
	if (file.indexOf('.js') >= 0){
		//require model file which registers the schema
		require(model_path + '/' + file);
	}
});
