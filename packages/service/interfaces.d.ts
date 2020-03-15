export interface BrowserInfo {
  browserName?: string;
  browserVersion?: string;
  platform?: string;
}

export interface ServiceOptions {
  outputDir?: string;
  instanceFolder?: (info: BrowserInfo) => string;
  customMatchers?: string[];
  largeImageThreshold?: number;
}
