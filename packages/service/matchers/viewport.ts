import { defineMatcher } from '../core/define-matcher';


@defineMatcher({ name: 'matchViewport' })
export class ViewportMatcher {
  async takeScreenshot(): Promise<Buffer> {
    const base64 = await browser.takeScreenshot();
    return Buffer.from(base64, 'base64');
  }
}
