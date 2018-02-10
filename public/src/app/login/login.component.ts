import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	newUser: User = new User();
	loggedUser: User = new User();
	errors: Array<any> = [];

  constructor(private _apiservice: ApiService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
  }

	registerValid(){
		this._apiservice.register(this.newUser)
		.then((data)=>{
			data['errors'] ? (
				console.log(data['errors'])
			):(
				console.log('great success!', data),
				sessionStorage.setItem('session', data['_id']),
				this._router.navigate(['cars'])
			)
		})
		.catch((err)=>{
			console.log(err);
		})
	}

	loginValid(){
		this._apiservice.login(this.loggedUser)
		.then((data)=>{
			data['errors'] ? (
				this.errors = [],
				console.log(data['errors']),
				this.errors.push(data['errors'])
			):(
				console.log('successfully logged in', data),
				sessionStorage.setItem('session', data['_id']),
				this._router.navigate(['cars'])
			)
		})
		.catch((err)=>{
			console.log(err, "catch in login")
		})
	}
}
