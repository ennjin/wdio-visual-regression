describe('Visual regression', () => {
  beforeEach(async() => {
    await browser.url(browser.config.baseUrl);
  });

  it('Should check element', async() => {
    const body = await browser.$('body > div');
    expect(await browser.matchElement('element', body)).toEqual(0);
  });

  it('Should check viewport', async() => {
    expect(await browser.matchViewport('viewport')).toEqual(0);
  });
});
