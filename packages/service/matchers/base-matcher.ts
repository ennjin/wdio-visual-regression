import compare from 'resemblejs/compareImages';

import { Subfolder, Config } from '../../config';
import { getImage, saveImage } from '../../utils';


export abstract class Matcher {
  private config: Config = Config.get();

  abstract takeScreenshot(): Promise<Buffer>;

  async match(name: string): Promise<number> {
    let expectedImage = getImage(name, Subfolder.EXPECTED);
    const actualImage = await this.takeScreenshot();
    
    if (!expectedImage) {
      saveImage(name, Subfolder.EXPECTED, actualImage);
      expectedImage = actualImage;
    }

    const result = await compare(expectedImage, actualImage, { output: this.config.ressembleOutput });
    const data = result.getBuffer();
    let mismatch = parseFloat(result.misMatchPercentage);

    if (mismatch > this.config.allowedMismatch) {
      saveImage(name, Subfolder.DIFF, data);
    } else {
      mismatch = 0;
    }

    saveImage(name, Subfolder.ACTUAL, actualImage);
    return mismatch;
  }
}
