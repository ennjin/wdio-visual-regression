import { match } from '../../internal';

/**
 * @deprecated Will be removed in next major release. Use `defineMatcher` decorator instead.
 */
export abstract class Matcher {
  abstract takeScreenshot(): Promise<Buffer>;

  match(name: string): Promise<number> {
    return match(name, () => this.takeScreenshot());
  }
}
