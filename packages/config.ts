import { ServiceOptions, TestFramework } from './service/interfaces';


const DEFAULT_FOLDER = 'regression';
const AVAILABLE_MATCHERS = ['matchElement', 'matchViewport'];


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
    const result = [...AVAILABLE_MATCHERS];
    
    if (Array.isArray(this.options.customMatchers)) {
      result.push(...this.options.customMatchers);
    }

    return result;
  }

  get framework(): TestFramework {
    return this.options.framework!;
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
