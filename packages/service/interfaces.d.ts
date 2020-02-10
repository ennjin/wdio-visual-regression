export type TestFramework = 'jasmine' | 'mocha';

export interface ServiceOptions {
  framework?: TestFramework;
  folder?: string;
  customMatchers?: string[];
}
