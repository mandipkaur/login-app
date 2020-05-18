import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getBaseUrl() {
    let publicUrl;
    browser.wait(() => {
        browser.getCurrentUrl().then((url) => {
            publicUrl = url;
            return publicUrl;
        });
    });
    return publicUrl;
  }

  getTitleText(): Promise<string> {
    return element(by.css('app-root app-header h2')).getText() as Promise<string>;
  }
  getLoginComp() {
    return element(by.css('app-root app-login'));
  }
}
