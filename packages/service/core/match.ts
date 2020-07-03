import compare from 'resemblejs/compareImages';

import { Config, Subfolder } from '../../config';
import { getImage, saveImage } from '../../utils';


export async function match(filename: string, takeScreenshot: () => Promise<Buffer>): Promise<number> {
  const config = Config.get();
  const actualImage = await takeScreenshot();
  let expectedImage = getImage(filename, Subfolder.EXPECTED);
  
  if (!expectedImage) {
    saveImage(filename, Subfolder.EXPECTED, actualImage);
    expectedImage = actualImage;
  }

  const result = await compare(expectedImage, actualImage, { output: config.ressembleOutput });
  const data = result.getBuffer();
  let mismatch = parseFloat(result.misMatchPercentage);

  if (mismatch > config.allowedMismatch) {
    saveImage(filename, Subfolder.DIFF, data);
  } else {
    mismatch = 0;
  }

  saveImage(filename, Subfolder.ACTUAL, actualImage);
  return mismatch;
}
