var mongoose = require("mongoose");
var car = mongoose.model("Car");
var user = mongoose.model("User");

module.exports = {
	addCar: (req,res)=>{
		console.log("new car");
		let newCar = new car(req.body);
		console.log('Creating car Listing..' , newCar._id);
		console.log('Logged in user ID', req.session.user_id);
		newCar._user = req.session.user_id;
		newCar.save((err)=>{
			if (err){
				console.log("something went wrong in add Car");
				res.json(err);
			}else {
				console.log("created a new car");
				console.log(newCar._user);
				res.json({_id: newCar._id});
			};
		})
	},
	getAllCars: (req,res)=>{
		car.find({}).exec((err,cars)=>{
			err ? (
				console.log("something went wrong"),
				res.json(err)
			):(
				console.log("all the cars in the world"),
				res.json(cars)
			)
		})
	},
	deleteCar: (req,res)=>{
		console.log('hit delete in controllers');
		car.findByIdAndRemove(req.body._id, car).exec((err, deletedCar)=>{
			err ? (
				console.log('something went wrong'),
				res.json(err)
			):(
				console.log('success'),
				res.json(deletedCar)
			)
		})
	},
	destroyCar: (req,res)=>{
		console.log("hit destroy in controllers");
		car.findByIdAndRemove(req.body._id, car).exec((err,deleteCar)=>{
			err ? (
				console.log("something went wrong"),
				res.json(err)
			):(
				console.log("success"),
				res.json(deleteCar)
			)
		})
	},
	getAllUserCars: (req,res)=>{
		car.find({ _user: req.session.user_id }).exec((err,allCars)=>{
			err ? (
				console.log("wrong!"),
				res.json(false)
			):(
				console.log("got all user cars"),
				console.log("req.session", req.session.user_id),
				res.json(allCars)
			);
		})
	},
	updateCar: (req,res)=>{
		console.log("update car");
		let updateCar = new car(req.body);
		car.findByIdAndUpdate(updateCar._id,
		updateCar).exec((err, foundCar)=>{
			err ? (
				console.log("wrong update"),
				res.json(false)
			):(
				console.log("edit the car"),
				res.json(foundCar)
			)
		})
	},


}
