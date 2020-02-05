import compare from 'resemblejs/compareImages';

import { Subfolder } from '../config';
import { ImageManager } from '../image-manager';


export abstract class Matcher {
  private manager: ImageManager = new ImageManager();

  abstract async takeScreenshot(): Promise<Buffer>;

  async match(name: string): Promise<number> {
    let expectedImage = this.manager.getImage(name, Subfolder.EXPECTED);
    const actualImage = await this.takeScreenshot();
    
    if (!expectedImage) {
      this.manager.saveImage(name, Subfolder.EXPECTED, actualImage);
      expectedImage = actualImage;
    }

    const result = await compare(expectedImage, actualImage);
    const data = result.getBuffer();
    const mismatch = parseFloat(result.misMatchPercentage);

    if (mismatch > 0) {
      this.manager.saveImage(name, Subfolder.DIFF, data);
    }

    this.manager.saveImage(name, Subfolder.ACTUAL, actualImage);
    return mismatch;
  }
}
