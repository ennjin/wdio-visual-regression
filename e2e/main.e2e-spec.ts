/// <reference types="webdriverio" />

describe('Visual regression', () => {
  it('Should check element', async () => {
    await browser.url(browser.config.baseUrl);
    // const body = await browser.$('body');
  });
});
