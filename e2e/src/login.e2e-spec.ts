import { LoginPage } from './login.po';
import {DashboardPage} from './dashboard.po';
import { browser, logging } from 'protractor';

describe('Logn-project App', () => {
  let page: LoginPage;
  let dashBoard:DashboardPage;
  let pageElts:any;
  const wrongUser = {
      user: 'Test',
      password: 'password'
  };
  const mockUser = {
      user: 'mandip',
      password: 'Naggar0'
  }

  beforeEach(() => {
    page = new LoginPage();
    dashBoard = new DashboardPage()
    pageElts = page.getPageElts();
    page.navigateTo();
  });

  it('should display login form', () => {
    expect(pageElts.formElt.isPresent()).toBeTruthy();
  });

  it('should display login form with two inputs and a login button', () => {
    expect(pageElts.inputElt.count()).toEqual(2);
    expect(pageElts.loginBtn.count()).toEqual(1);
  });

  it('should allow user to add username and password', async() => {
    await page.addCredentials(wrongUser.user,wrongUser.password);
    let input = await page.getUserName();;
    expect(input).toEqual('Test');
  });
  it('should display error message if user or password is empty', async() => {
    await page.addCredentials('','');
    let input = page.getPageElts().invalidUName;
    expect(input.isDisplayed()).toBeTruthy();
    expect(page.getPageElts().invalidPwrd.isDisplayed()).toBeTruthy();
  });
  it('should not  display error message if user and password is correct ', async() => {
    page.addCredentials(mockUser.user,mockUser.password);
    expect(page.getErrorMessage()).toEqual([]);
  });
  it('should navigate to dashboard if user is loggin i.e if user is authentic', async() => {
    page.addCredentials(mockUser.user,mockUser.password);
    expect(dashBoard.getDashboardText()).toEqual('This is my Dashboard');
  });
//   it('should  display error message if user credetials are incorrect', async() => {
//     await page.addCredentials(wrongUser.user,wrongUser.password);
//     expect(page.getErrorMessage()).toBeFalsy();
//     expect(page.getErrorMessage().getText()).toEqual('Invalid Credentails.Please enter valid username or password.');

//   });
//   it('should display error message if user credetials are incorrect', async() => {
//     await page.addCredentials(wrongUser.user,wrongUser.password);
//     expect(page.getErrorMessage()).toEqual('Invalid Credentails.Please enter valid username or password.');
//   });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
