import { resolve } from 'path';

import { ServiceOptions, BrowserInfo } from '../interfaces';
import { TestContextResult } from '../report';
import {
  Config,
  VisualRegressionReport,
  Subfolder,
  checkAndCreateFolder,
  isFunction,
  MATCHER_NAME,
} from '../internal';


export class VisualRegression {
  private config: Config = Config.get();
  private report: VisualRegressionReport = new VisualRegressionReport();

  private instanceFolder?: (info: BrowserInfo) => string;

  private get browserInfo(): BrowserInfo {
    const { browserName, browserVersion, version, platform, platformName } = browser.capabilities;
    return { browserName, browserVersion: version ?? browserVersion,  platform: platform ?? platformName };
  }
  
  constructor(options: ServiceOptions) {
    const { outputDir, customMatchers, largeImageThreshold, instanceFolder, allowedMismatch } = options;
    this.instanceFolder = instanceFolder;
    this.config.patch({ outputDir, customMatchers, largeImageThreshold, allowedMismatch });
  }

  before() {
    this.initFolders();
    this.registerMatchers();
    this.report.clear();
  }

  afterCommand(commandName: string, args: any[], result: any) {
    const hasMatcherName = this.config.customMatchers.includes(commandName);
    const hasMatcherClass = this.config.customMatchers
      .filter(item => typeof item === 'function' && Reflect.get(item.prototype, MATCHER_NAME) === commandName)
      .length > 0

    if (hasMatcherClass || hasMatcherName) {
      this.report.saveMatcherResult(args[0], result);
    }
  }

  // Jasmine and mocha
  afterTest({ description }: { description: string }, { passed }: { passed: boolean }) {
    this.addContextToReport({ testName: description, passed });
  }

  // Cucumber
  afterScenario(_uri: string, _feature: any, scenario: any, result: any) {
    this.addContextToReport({ testName: scenario.name, passed: result.status === 'passed' });
  }

  after() {
    this.report.generate();
  }

  private registerMatchers(): void {
    this.config.customMatchers.forEach(item => {
      if (typeof item === 'function') {
        const matcherName = Reflect.get(item.prototype, MATCHER_NAME);
        browser.addCommand(matcherName, (name: string, ...args: any[]) => {
          const instance = Reflect.construct(item, args);
          return instance.match(name);
        });
      }
    });
  }

  private initFolders(): void {
    checkAndCreateFolder(this.config.outputDir);

    if (this.instanceFolder && isFunction(this.instanceFolder)) {
      this.config.patch({ instanceFolder: this.instanceFolder(this.browserInfo) });
      checkAndCreateFolder(this.config.instanceDir);
    }

    for (const key of Object.values(Subfolder)) {      
      const path = resolve(this.config.instanceDir, key);
      checkAndCreateFolder(path);
    }
  }

  private addContextToReport({ testName, passed }: Partial<TestContextResult>) {
    const { platform, browserName, browserVersion } = this.browserInfo;
    const version = browserVersion?.split('.')[0];
    const browser = `${ browserName }_${ version }_${ platform }`.toLowerCase();
    this.report.saveTestContext({ testName, passed, browser });
  }
}
