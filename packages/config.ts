import { join } from 'path';

import { ServiceOptions, AnyObject } from './interfaces';
import { ViewportMatcher, ElementMatcher } from './internal';


const DEFAULT_FOLDER = 'regression';
const DEFAULT_MATCHERS = [ViewportMatcher, ElementMatcher];
const DEFAULT_ALLOWED_MISMATCH = 0.1;
const LARGE_IMAGE_THRESHOLD = 1200;
const DEFAULT_INITIATE_EXPECTED_IMAGE = true;

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

  get customMatchers(): (AnyObject | string)[] {    
    if (Array.isArray(this.options?.customMatchers)) {
      return [...DEFAULT_MATCHERS, ...this.options.customMatchers];
    }
    return DEFAULT_MATCHERS;
  }

  get allowedMismatch(): number {
    return this.options.allowedMismatch ?? DEFAULT_ALLOWED_MISMATCH;
  }

  get ressembleOutput() {
    return {
      largeImageThreshold: this.options.largeImageThreshold ?? LARGE_IMAGE_THRESHOLD
    }
  }

  get initiateExpectedImage(): boolean {
    return this.options.initiateExpectedImage ?? DEFAULT_INITIATE_EXPECTED_IMAGE
  }

  private constructor() { /* pass */ }

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
