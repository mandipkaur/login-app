import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';

import { ValidateService } from '../shared/validate.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  error:string = null;

  constructor(private router:Router,private validateService:ValidateService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'user':new FormControl('',[Validators.required]),
      'password': new FormControl('',[Validators.required])
    }
    );
    localStorage.clear();
  }
  /**
   * OnLogin()
   * to authenticate user 
   */
  onLogin = () => {
    console.log('Inside onLogin method,calling authentcateUser method');
    const isValid = this.validateService.authentcateUser(this.loginForm.value.user,this.loginForm.value.password);
    if(isValid){
        console.log('This is a valid user,navigate');
        localStorage.setItem('isValidUser',JSON.stringify(true));
        this.router.navigate(['/dashboard']);
        this.error = null;
    }
    else {
        localStorage.setItem('isValidUser',JSON.stringify(false));
        console.log('Invalid user set error');
        this.error = "Invalid Credentails.Please enter valid username or password.";
    }
  }

}
