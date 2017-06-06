import { AngularComponentTableQueryPage } from './app.po';

describe('angular-component-table-query App', () => {
  let page: AngularComponentTableQueryPage;

  beforeEach(() => {
    page = new AngularComponentTableQueryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
