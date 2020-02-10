import compare from 'resemblejs/compareImages';

import { Subfolder } from '../../config';
import { getImage, saveImage } from '../../utils';


export abstract class Matcher {
  abstract takeScreenshot(): Promise<Buffer>;

  async match(name: string): Promise<number> {
    let expectedImage = getImage(name, Subfolder.EXPECTED);
    const actualImage = await this.takeScreenshot();
    
    if (!expectedImage) {
      saveImage(name, Subfolder.EXPECTED, actualImage);
      expectedImage = actualImage;
    }

    const result = await compare(expectedImage, actualImage);
    const data = result.getBuffer();
    const mismatch = parseFloat(result.misMatchPercentage);

    if (mismatch > 0) {
      saveImage(name, Subfolder.DIFF, data);
    }

    saveImage(name, Subfolder.ACTUAL, actualImage);
    return mismatch;
  }
}
