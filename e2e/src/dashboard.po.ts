import { browser, by, element } from 'protractor';

export class DashboardPage {
  navigateTo(): Promise<unknown> {
    return browser.get('/dashboard') as Promise<unknown>;
  }
  getDashboardText(): Promise<string> {
    return element(by.css('app-dashboard  h1')).getText() as Promise<string>;
  }
}
