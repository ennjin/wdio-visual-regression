import { Matcher } from './base-matcher';


export class ViewportMacther extends Matcher {
  async takeScreenshot(): Promise<Buffer> {
    const base64 = await browser.takeScreenshot();
    return Buffer.from(base64, 'base64');
  }
}
