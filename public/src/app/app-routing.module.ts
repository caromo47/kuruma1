import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateComponent } from './dashboard/create/create.component';
import { BrowseComponent } from './dashboard/browse/browse.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
	{path: 'home', component: HomeComponent},
	{path: 'login', component: LoginComponent},
	{path: '', redirectTo: 'home', pathMatch: 'full'},
	{path: 'cars', redirectTo: 'dashboard/browse', pathMatch: 'full'},
	{path: 'dashboard', component: DashboardComponent,
	children: [
		{path: 'browse', component: BrowseComponent},
		{path: 'mycars', component: CreateComponent}
	]},
	{path: '**', redirectTo: 'login'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
