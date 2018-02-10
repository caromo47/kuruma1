import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../api.service';
import { Car } from './../../Car';
import { User } from './../../User';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
	allCars: Array<any> = [];
	currentUser: string;
	cList: object[] = [];
	searchTerm:string = "";

  constructor(private _http: ApiService) { }

  ngOnInit() {
		this.getAllCars();
		this.getCurrentUser();
  }

	getAllCars(){
		console.log("all the cars in the world");
		this._http.getAllCars()
		.then((cars)=>{
			console.log(cars);
			this.allCars = cars;
			this.cList = cars;
		})
		.catch((err)=>{
			console.log(err)
		})
	}
	getCurrentUser(){
		console.log("current user");
		this._http.getCurrent()
		.then((data)=>{
			this.currentUser = data['_id'];
			console.log(data['_id'])
		})
		.catch((err)=>{
			console.log(err)
		})
	}
	onContact(id){
		console.log(id);
		this._http.findCreator(id)
		.then((contact)=>{
			console.log(contact);
			alert("Name: "+ contact['name'] + "\nEmail: " + contact['email']);
		})
	}
	onDelete(idx){
	this._http.destroyCar(this.allCars[idx])
		.then(()=>{
			console.log( "deleted car");
			this.getAllCars();
		})
		.catch((err)=>{
			console.log(err);
		})
	}
	searchCars(){
		this.allCars = this.cList.filter((car)=>{
			return car['title'].toLowerCase().includes(this.searchTerm.toLowerCase()) || car['location'].toLowerCase().includes(this.searchTerm.toLowerCase())
		})
	}
}
