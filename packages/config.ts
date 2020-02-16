import { ServiceOptions } from './service/interfaces';


const DEFAULT_FOLDER = 'regression';
const AVAILABLE_MATCHERS = ['matchElement', 'matchViewport'];
const LARGE_IMAGE_THRESHOLD = 1200;

export enum Subfolder {
  ACTUAL = 'actual',
  DIFF = 'diff',
  EXPECTED = 'expected'
}

export class Config {
  private static instance: Config;
  private options: ServiceOptions = {};

  get folder(): string {
    return this.options.folder ?? DEFAULT_FOLDER;
  }

  get customMatchers(): string[] {    
    if (Array.isArray(this.options?.customMatchers)) {
      return [...AVAILABLE_MATCHERS, ...this.options.customMatchers];
    }
    return AVAILABLE_MATCHERS;
  }

  get largeImageThreshold(): number {
    return this.options.largeImageThreshold ?? LARGE_IMAGE_THRESHOLD;
  }

  private constructor() { /* pass*/ };

  public static get(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }

    return Config.instance;
  }

  public patch(value: ServiceOptions): void {
    this.options = { ...this.options, ...value };
  }
}
