import compare from 'resemblejs/compareImages';

import { Subfolder, Config } from '../../config';
import { getImage, saveImage } from '../../utils';
import { ScreenshotManager } from '../interfaces';


export const MATCHER_NAME = Symbol('matcherName');
const MATCH_METHOD = 'match';
const TAKE_SCREENSHOT_METHOD = 'takeScreenshot';

interface MatcherOptions {
  name: string;
}

async function match(filename: string, takeScreenshot: () => Promise<Buffer>): Promise<number> {
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

function validateMatcherOptions(options: MatcherOptions): void {
  if (!options.name) {
    throw new Error('MatcherOptions.name is required!');
  }
}

export function CreateMatcher<T extends ScreenshotManager>(options: MatcherOptions) {
  validateMatcherOptions(options);

  return (target: Function) => {
    Reflect.set(target.prototype, MATCHER_NAME, options.name);

    Object.defineProperty(target.prototype, MATCH_METHOD, {
      value(this: T, filename: string) {
        if (!(TAKE_SCREENSHOT_METHOD in this)) {
          throw new Error('Method `takeScreenshot` must be implemented!');
        }
        return match(filename, this.takeScreenshot.bind(this));
      }
    });
  }
};
