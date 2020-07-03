import { match } from '../../internal';
import { ScreenshotManager } from '../interfaces';


export const MATCHER_NAME = Symbol('matcherName');
const MATCH_METHOD = 'match';
const TAKE_SCREENSHOT_METHOD = 'takeScreenshot';

interface MatcherOptions {
  name: string;
}

function validateMatcherOptions(options: MatcherOptions): void {
  if (!options.name) {
    throw new Error('MatcherOptions.name is required!');
  }
}

export function defineMatcher(options: MatcherOptions) {
  validateMatcherOptions(options);

  return <T extends ScreenshotManager>(target: Function) => {
    Reflect.set(target.prototype, MATCHER_NAME, options.name);

    Object.defineProperty(target.prototype, MATCH_METHOD, {
      value(this: T, filename: string) {
        if (!(TAKE_SCREENSHOT_METHOD in this)) {
          throw new Error('Method `takeScreenshot` must be implemented!');
        }
        return match(filename, () => this.takeScreenshot());
      }
    });
  }
};
