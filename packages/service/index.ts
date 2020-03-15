import { resolve } from 'path';

import { Config, Subfolder } from '../config';
import { ServiceOptions, BrowserInfo } from './interfaces';
import { ElementMatcher, ViewportMatcher } from './matchers';
import { VisualRegressionReport } from '../reporter';
import { checkAndCreateFolder, isCallable } from '../utils';


export class VisualRegression {
  private config: Config = Config.get();
  private report: VisualRegressionReport = new VisualRegressionReport();

  private instanceFolder?: (info: BrowserInfo) => string;

  private get browserInfo(): BrowserInfo {
    const { browserName, browserVersion, version, platform } = browser.capabilities;
    return { browserName, browserVersion: version ?? browserVersion,  platform };
  }
  
  constructor(options: ServiceOptions) {
    const { outputDir, customMatchers, largeImageThreshold, instanceFolder } = options;
    this.instanceFolder = instanceFolder;
    this.config.patch({ outputDir, customMatchers, largeImageThreshold });
  }

  before() {
    this.setupFolders();
    this.report.clear();

    browser.addCommand('matchElement', (name: string, element: WebdriverIOAsync.Element) => {
      const elementMatcher = new ElementMatcher(element);
      return elementMatcher.match(name);
    });

    browser.addCommand('matchViewport', (name: string) => {
      const viewportMatcher = new ViewportMatcher();
      return viewportMatcher.match(name);
    });
  }

  afterCommand(commandName: string, args: any[], result: any) {
    if (this.config.customMatchers.includes(commandName)) {
      this.report.saveMatcherResult(args[0], result);
    }
  }

  // Jasmine and mocha
  afterTest(context: any) {
    this.report.saveTestContext({
      testName: context.title,
      passed: context.passed
    });
  }

  // Cucumber
  afterScenario(_uri: string, _feature: any, scenario: any, result: any) {
    this.report.saveTestContext({
      testName: scenario.name,
      passed: result.status === 'passed'
    });
  }

  after() {
    this.report.generate();
  }

  private setupFolders(): void {
    checkAndCreateFolder(this.config.outputDir);

    if (isCallable(this.instanceFolder)) {
      const instanceFolder = this.instanceFolder!(this.browserInfo);
      this.config.patch({ instanceFolder });
      checkAndCreateFolder(this.config.instanceDir);
    }

    for (const key of Object.values(Subfolder)) {      
      const path = resolve(this.config.instanceDir, key);
      checkAndCreateFolder(path);
    }
  }
}
