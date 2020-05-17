import { browser, by, element } from 'protractor';

export class LoginPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getPageElts = ()=> {
    let navElts = element.all(by.css('app-login div'));

    return {
      navElts: navElts.get(0),
      formElt: element.all(by.css(' app-login form')),
      inputElt: element.all(by.css('app-login input')),
      loginBtn: element.all(by.css(' app-login button')),
      invalidUName: element.all(by.className('.invalid-user')),
      invalidPwrd: element.all(by.className('.invalid-password')),
      errorMessage: element.all(by.css('app-login span'))
    };
  }
  addCredentials = (user:string,password:string) => {
      element(by.css('[name="user"]')).sendKeys(user);
      element(by.css('[name="password"]')).sendKeys(password);
      element(by.css('.btn-primary')).click();
  }

  getUserName = () => {
      return element(by.css('[name="user"]')).getAttribute('value');
  }
  getPassword = () => {
    return element(by.css('[name="user"]')).getAttribute('value');
  }
  getErrorMessage = ()=>{
      return element.all(by.css('.error-message'));
  }
}
