export type AnyObject = Record<string, any>; 

export interface BrowserInfo {
  browserName?: string;
  browserVersion?: string;
  platform?: string;
}

export interface ServiceOptions {
  outputDir?: string;
  instanceFolder?: (info: BrowserInfo) => string;
  customMatchers?: (AnyObject | string)[];
  largeImageThreshold?: number;
  allowedMismatch?: number;
}
