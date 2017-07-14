import { CollectDataPage } from './app.po';

describe('collect-data App', () => {
  let page: CollectDataPage;

  beforeEach(() => {
    page = new CollectDataPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
