var mongoose = require('mongoose');
var user = mongoose.model('User');
var bcrypt = require('bcrypt');
var session = require('express-session');

module.exports = {
	register: (req,res)=>{
		console.log("user.register");
		user.findOne({email: req.body.email}).exec((err, newUser)=>{
			if (err){
				console.log("error in register");
				res.json({
					errors: {
						login: {message: "email is already in use"}
					}
				});
			} else {
				if (!newUser){
					let newUser = new user(req.body);
					let hashedPW = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync());
					newUser.password = hashedPW;
					newUser.save((err)=>{
						err ? (
							console.log("something went wrong registering"),
							res.json(err)
						):(
							console.log("registered!"),
							console.log(newUser.name),
							console.log(newUser._id),
							req.session.user_id = newUser._id,
							res.json({_id: newUser._id})
						);
					})
				}
			}
		})
	},
	login: (req,res)=>{
		console.log("user.login");
		user.findOne({email:req.body.email}).exec((err, foundUser)=>{
			if (err){
				console.log("error in login");
				res.json(err);
			} else {
				console.log("no error");
				if(foundUser){
					console.log("found user");
					if(bcrypt.compareSync(req.body.password, foundUser.password) == true){
						console.log("passwords matched");
						req.session.user_id = foundUser._id;
						res.json({_id: foundUser._id});
					} else {
						console.log("passwords dont match");
						res.json({
							errors: {
								login: {message: "incorrect email and password combination"}
							}
						});
					}
				} else {
					res.json({
						errors: {
							login: {message: "incorrect email and password combination"}
						}
					});
				}
			}
		})
	},
	getCurrent: (req,res)=>{
		console.log("users.getCurrent");
		if(!req.session.user_id){
			res.json({
				errors:{
					getCurrent: {message: "you are not logged in"}
				}
			});
		} else {
			user.findOne({_id:req.session.user_id}).exec((err, foundUser)=>{
				err ? (
					console.log("didnt work"),
					res.json(false)
				):(
					console.log("found user in session", req.session.user_id),
					res.json(foundUser)
				);
			})
		}
	},
	logout: (req,res)=>{
		console.log("user.logout");
		req.session.destroy();
		res.json(true)
	},
	findCreator: (req,res)=>{
		console.log("user.findCreator");
		user.findOne({_id: req.body.user_id}).populate('cars').exec((err,user)=>{
			if (err) {
				console.log(err);
				res.json(err);
			} else {
				console.log(user);
				res.json(user);
			}
		})
	}
}
