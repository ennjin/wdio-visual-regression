import { createCanvas, loadImage } from 'canvas';

const BASE64_PREFIX = 'data:image/png;base64,';


export class DOMImage {
  private element: WebdriverIOAsync.Element;

  constructor(element: WebdriverIOAsync.Element) {
    this.element = element;
  }

  private async getElementRect() {
    const { x, y } = await this.element.getLocation();
    const { width, height } = await this.element.getSize();
    return { x, y, width, height }
  }

  private async takeElementScreenshot(): Promise<Buffer> {
    // TODO: full pgae screenshot intead viewport
    const base64 = await browser.takeScreenshot();
    const image = await loadImage(BASE64_PREFIX + base64);

    const { x, y, width, height } = await this.getElementRect();
    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');
    context.drawImage(image, x, y, width, height, 0, 0, width, height);
    
    return canvas.toBuffer();
  }
}
