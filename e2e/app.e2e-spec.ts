import { PagSeguroPage } from './app.po';

describe('pag-seguro App', () => {
  let page: PagSeguroPage;

  beforeEach(() => {
    page = new PagSeguroPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
