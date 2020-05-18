import {Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ValidateService {
  dummyUser = {
    user: 'mandip',
    password: 'Nagarr0'
  };
  /**
   * authentcateUser()
   * to check user credentials
   */
  authentcateUser = (userName: string, password: string) => {
    console.log('Inside authentcateUser method');
    if (userName === this.dummyUser.user && password === this.dummyUser.password){
      return true;
    }
    return false;
  }
}
