import { Ng2RelauiPage } from './app.po';

describe('ng2-relaui App', () => {
  let page: Ng2RelauiPage;

  beforeEach(() => {
    page = new Ng2RelauiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
