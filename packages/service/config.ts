import { ServiceOptions } from './interfaces';


export const DEFAULT_FOLDER = 'regression';

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
