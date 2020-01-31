import { ServiceOptions } from './models';


export const DEFAULT_FOLDER = 'regression';
export const SUBFOLDERS = ['actual', 'expected', 'diff'];

export class Config {
  private static instance: Config;
  private options: ServiceOptions;
  
  get folder(): string {
    return this.options.folder;
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

