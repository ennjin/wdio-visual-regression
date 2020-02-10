import { resolve } from 'path';

import { Config, Subfolder } from '../config';
import { ServiceOptions } from './interfaces';
import { ElementMatcher, ViewportMatcher } from './matchers';
import { VisualRegressionReport } from '../reporter';
import { checkAndCreateFolder } from '../utils';


export class VisualRegression {
  private config: Config = Config.get();
  private report: VisualRegressionReport = new VisualRegressionReport();
  
  constructor(options: ServiceOptions) {
    const { folder, customMatchers, framework } = options;
    this.config.patch({ folder, customMatchers, framework });
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

  afterTest(context: any) {
    this.report.saveTestContext(context);
  }

  after() {
    this.report.generate();
  }

  private setupFolders(): void {
    checkAndCreateFolder(this.config.folder);

    for (const key of Object.values(Subfolder)) {      
      const path = resolve(this.config.folder, key);
      checkAndCreateFolder(path);
    }
  }
}
