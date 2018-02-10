import { Component, DoCheck, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './api.service';
import * as $ from 'jquery/dist/jquery.min.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck, OnInit {
	session: any;

	constructor(private _apiService: ApiService, private _router: Router,
	private _route: ActivatedRoute){
		this.session = sessionStorage.getItem('session');
	}

	ngOnInit(){
		$(".icon").on("click", function() {
			if($(this).text()==="\u2715"){
				$(this).text("\u2630")
			}else{
				$(this).text("\u2715");
		}});
	}

	ngDoCheck(){
		this.session = sessionStorage.getItem('session');
	}

	logout() {
		console.log('logoff()');
		this._apiService.logout()
			.then((data) => {
				sessionStorage.removeItem('session');
				this.session = "";
				this._router.navigate(['']);
			})
			.catch((err)=> console.log("logout", err))
	}
	dropDown() {
		var x = document.getElementById("myTopnav");
		if (x.className === "nav") {
			x.className += " responsive";
		} else {
			x.className = "nav";
		}
	}
}
