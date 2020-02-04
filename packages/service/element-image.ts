import { existsSync, writeFileSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { createCanvas, loadImage } from 'canvas';
import compare from 'resemblejs/compareImages';

import { Config, Subfolder } from './config';


const BASE64_PREFIX = 'data:image/png;base64,';

export class ElementImage {
  private element: WebdriverIOAsync.Element;
  private config: Config = Config.get();

  constructor(element: WebdriverIOAsync.Element) {
    this.element = element;
  }

  async compare(name: string): Promise<number> {
    let expectedData = this.getFile(name, Subfolder.EXPECTED);
    const actualData = await this.takeScreenshot();
    
    if (!expectedData) {
      this.saveFile(name, Subfolder.EXPECTED, actualData);
      expectedData = actualData;
    }

    const result = await compare(expectedData, actualData);
    const data = result.getBuffer();
    const mismatch = parseFloat(result.misMatchPercentage);

    if (mismatch > 0) {
      this.saveFile(name, Subfolder.DIFF, data);
    }

    this.saveFile(name, Subfolder.ACTUAL, actualData);
    return mismatch;
  } 

  private async getRect() {
    const { x, y } = await this.element.getLocation();
    const { width, height } = await this.element.getSize();
    return { x, y, width, height }
  }

  private async takeScreenshot(): Promise<Buffer> {
    // TODO: add scroll to element before screenshot taking
    const base64 = await browser.takeScreenshot();
    const image = await loadImage(BASE64_PREFIX + base64);

    const { x, y, width, height } = await this.getRect();
    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');
    context.drawImage(image, x, y, width, height, 0, 0, width, height);
    
    return canvas.toBuffer();
  }

  private saveFile(name: string, subfoler: Subfolder, data: Buffer): void {
    const path = this.resolvePath(name, subfoler);
    writeFileSync(path, data);
  }

  private getFile(name: string, type: Subfolder): Buffer {
    const path = this.resolvePath(name, type);
    return existsSync(path) ? readFileSync(path) : null;
  }

  private resolvePath(name: string, subfolder: Subfolder): string {
    return resolve(this.config.folder, subfolder, `${ name }.png`);
  }
}
