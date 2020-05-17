import { DashboardPage } from './dashboard.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: DashboardPage;

  beforeEach(() => {
    page = new DashboardPage();
  });

  it('should display header component with title text', () => {
    page.navigateTo();
    expect(page.getDashboardText()).toEqual('This is my Dashboard');
  });
  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
