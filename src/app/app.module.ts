import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import{RouterModule,Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './core/auth-guard';

const appRoutes:Routes = [
 {
    path: 'login',
    component: LoginComponent 
 },
 {
   path: 'dashboard',
   canActivate:[AuthGuard],
   component: DashboardComponent
 },
 {
   path: '',
   pathMatch: 'full',
   redirectTo: 'login'
 },
 {
   path: '**',
   redirectTo: 'login'
 }
  
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
