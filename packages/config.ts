import { join } from 'path';
import { ServiceOptions } from './service/interfaces';


const DEFAULT_FOLDER = 'regression';
const DEFAULT_MATCHERS = ['matchElement', 'matchViewport'];
const LARGE_IMAGE_THRESHOLD = 1200;

interface ConfigOptions extends Omit<ServiceOptions, 'instanceFolder'> { 
  instanceFolder?: string;
}

export enum Subfolder {
  ACTUAL = 'actual',
  DIFF = 'diff',
  EXPECTED = 'expected'
}

export class Config {
  private static instance: Config;
  private options: ConfigOptions = {};

  get outputDir(): string {
    return this.options.outputDir ?? DEFAULT_FOLDER;
  }

  get instanceDir(): string {
    const instanceFolder = this.options.instanceFolder ?? '';
    return join(this.outputDir, instanceFolder);
  }

  get customMatchers(): string[] {    
    if (Array.isArray(this.options?.customMatchers)) {
      return [...DEFAULT_MATCHERS, ...this.options.customMatchers];
    }
    return DEFAULT_MATCHERS;
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

  public patch(value: ConfigOptions): void {
    this.options = { ...this.options, ...value };
  }
}
