import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../api.service';
import { User } from './../../user';
import { Car } from './../../car';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
	newCar: Car = new Car();
	myCars: Array<Car> = [];

  constructor(private _apiservice: ApiService) { }

  ngOnInit() {
		this.getCars();
  }

	getCars(){
		this._apiservice.getAllUserCars()
		.then((cars)=>{
			this.myCars = cars;
			console.log(cars);
		})
		.catch((err)=>{
			console.log(err);
		})
	}
	addCar(){
		this._apiservice.addCar(this.newCar)
		.then(()=>{
			this.getCars();
		})
		.catch((err)=>{
			console.log(err);
		})
	}
	updateCar(idx){
		this._apiservice.updateCar(this.myCars[idx])
		.then(()=>{
			this.getCars();
		})
		.catch((err)=>{
			console.log(err);
		})
	}
	deleteCar(idx){
		this._apiservice.deleteCar(this.myCars[idx])
		.then(()=>{
			this.getCars();
		})
		.catch((err)=>{
			console.log(err);
		})
	}
}
