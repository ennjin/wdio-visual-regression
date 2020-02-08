/// <reference types="webdriverio" />

describe('Visual regression', () => {
  beforeEach(async() => {
    await browser.url(browser.config.baseUrl);
  });

  it('Should check element', async () => {
    const body = await browser.$('body > div');
    // TODO: Add typings
    expect(await (browser as any).matchElement('element', body)).toEqual(0);
  });

  it('Should check viewport', async () => {
    // TODO: Add typings
    expect(await (browser as any).matchViewport('viewport')).toEqual(0);
  });
});
