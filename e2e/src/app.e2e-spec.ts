import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display header component with title text', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('LoginApp');
  });
  it('should display login component', () => {
    page.navigateTo();
    expect(page.getLoginComp().isDisplayed()).toBeTruthy();
  });
  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
