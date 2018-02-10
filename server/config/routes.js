var car = require('../controllers/cars.js');
var user = require('../controllers/users.js');
var path = require('path');

module.exports = (app)=>{
	//user
	app.post('/api/register', user.register);
	app.post('/api/login', user.login);
	app.get('/api/logout', user.logout);
	app.get('/api/currentuser', user.getCurrent);
	app.post('/api/getallcars/findCreator', user.findCreator);
	//cars
	app.get('/api/getallcars', car.getAllCars);
	app.post('/api/destroy', car.destroyCar);
	app.post('/api/car/delete', car.deleteCar);
	app.get('/api/mycars', car.getAllUserCars);
	app.post('/api/car', car.addCar);
	app.post('/api/car/edit', car.updateCar);

	app.all('*', (req,res)=>{
		res.sendFile(path.resolve('./public/dist/index.html'));
	});
}
