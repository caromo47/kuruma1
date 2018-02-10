import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _apiService: ApiService, private _router: Router) { }

  ngOnInit() {
		this._apiService.getCurrent()
		.then((user)=>{
			console.log(user);
		})
		.catch((err)=>{
			this._router.navigate(['login'])
		})
  }
}
