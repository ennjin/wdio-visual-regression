import { createCanvas, loadImage } from 'canvas';

import { Matcher } from './base-matcher';
import { scrollTo, getScrollTop } from '../browser-helpers';


const BASE64_PREFIX = 'data:image/png;base64,';

export class ElementMatcher extends Matcher {
  private element: WebdriverIOAsync.Element;

  constructor(element: WebdriverIOAsync.Element) {
    super();
    this.element = element;
  }

  async takeScreenshot(): Promise<Buffer> {
    const { x, y, width, height } = await this.getElementRect();
    const scrollTop = await getScrollTop();

    // scroll to element
    await scrollTo(y);

    const base64 = await browser.takeScreenshot();
    const image = await loadImage(BASE64_PREFIX + base64);
    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');
    context.drawImage(image, x, y - scrollTop, width, height, 0, 0, width, height);

    // restore scroll
    await scrollTo(scrollTop);

    return canvas.toBuffer();
  }

  private async getElementRect() {
    const { x, y } = await this.element.getLocation();
    const { width, height } = await this.element.getSize();
    return { x, y, width, height }
  }
}
