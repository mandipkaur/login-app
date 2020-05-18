import { browser, by, element } from 'protractor';
import { LoginPage } from '../login/login.po';

export class DashboardPage {
  mockUser = {
    user: 'mandip',
    password: 'Nagarr0'
  };

  navigateTo() {
    let logInPage = new LoginPage();
    logInPage.addCredentials(this.mockUser.user,this.mockUser.password);
    //return browser.get('/dashboard') as Promise<unknown>;
  }
  getDashboardText(): Promise<string> {
    return element(by.css('app-dashboard  h1')).getText() as Promise<string>;
  }
  getDashboard() {
    return element(by.css('app-dashboard  h1'));
  }
}
