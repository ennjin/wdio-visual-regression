import compare from 'resemblejs/compareImages';

import { Subfolder, Config } from '../../config';
import { getImage, saveImage } from '../../utils';
import { MatcherManager } from './matcher-manager';


const MATCH_METHOD = Symbol('match');
const TAKE_SCREENSHOT_METHOD = Symbol('takeScreenshot');

interface MatcherOptions {
  name: string;
}

interface ScreenshotManager {
  takeScreenshot(): Promise<Buffer>;
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

function Matcher<T extends ScreenshotManager>(options: MatcherOptions) {
  const config = Config.get();

  if (!config.customMatchers.includes(options.name)) {
    config.patch({ customMatchers: [...config.customMatchers, options.name] });
  }

  return (target: Function) => {
    const matcherManager = MatcherManager.get();
    matcherManager.addMatcher(options.name, target);

    Object.defineProperty(target, MATCH_METHOD, {
      async value(this: T, filename: string) {
        if (!Object.getOwnPropertyDescriptor(this, TAKE_SCREENSHOT_METHOD)) {
          throw new Error('Method `takeScreenshot` must be implemented!');
        }
        return match(filename, this.takeScreenshot);
      }
    });
  }
};

@Matcher({ name: 'matchViewport' })
export class ViewportMatcher {
  async takeScreenshot(): Promise<Buffer> {
    const base64 = await browser.takeScreenshot();
    return Buffer.from(base64, 'base64');
  }
}
