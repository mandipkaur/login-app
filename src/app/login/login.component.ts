import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  error:string = null;

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'user':new FormControl('',Validators.required),
      'password': new FormControl('',Validators.required)
    }
    );
  }
  
  authentcateUser = (userName:string,password:string)=> {
    console.log('Inside authentcateUser method');
    if(userName === 'mandip' && password === 'Naggar0'){
        return true;
    }
    return false;
  }
  onLogin = () => {
    console.log('Inside onLogin method,calling authentcateUser method');
    const isValid = this.authentcateUser(this.loginForm.value.user,this.loginForm.value.password);
    if(isValid){
        console.log('This is a valid user,navigate');
        this.router.navigate(['/dashboard']);
        this.error = null;
    }
    else {
        console.log('Invalid user set error');
        this.error = "Invalid Credentails.Please enter valid username or password";
    }
  }

}
