import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    'user':new FormControl('',Validators.required),
    'password': new FormControl('',Validators.required)
  }
  );
  error:string = null;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  
  validateUser = (userName:string,password:string)=> {
    if(userName === 'mandip' && password === 'Naggar0'){
        return true;
    }
    return false;
}
  onLogin = () => {
    console.log(this.loginForm.value.user,this.loginForm.value.password);
    const isValid = this.validateUser(this.loginForm.value.user,this.loginForm.value.password);
    if(isValid){
        this.router.navigate(['/dashboard']);
        this.error = null;
    }
    else {
        this.error = "Invalid Credentails.Please enter valid username or password";
    }
  }

}
