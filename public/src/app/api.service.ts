import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ApiService {

  constructor(private _http: HttpClient) { }

	register(user){
		return this._http.post('/api/register', user).toPromise();
	}
	login(user){
		console.log("in service login method", user);
		return this._http.post('/api/login', user).toPromise();
	}
	logout(){
		return this._http.get('/api/logout').toPromise();
	}
	getCurrent(){
		return this._http.get('/api/currentuser').toPromise();
	}
	getAllCars(){
		return this._http.get<any[]>('/api/getallcars').toPromise();
	}
	getAllUserCars(){
		return this._http.get<any[]>('/api/mycars').toPromise();
	}
	findCreator(user_id){
		return this._http.post('/api/getallcars/findCreator', {user_id:user_id}).toPromise();
	}
	addCar(car){
		return this._http.post('/api/car', car).toPromise();
	}
	updateCar(car){
		return this._http.post('/api/car/edit', car).toPromise();
	}
	deleteCar(car){
		return this._http.post('/api/car/delete', car).toPromise();
	}
	destroyCar(car){
		return this._http.post('/api/destroy', car).toPromise();
	}
}
