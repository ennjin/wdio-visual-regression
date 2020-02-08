import { resolve } from 'path';

import { Config, Subfolder } from './config';
import { ServiceOptions } from './interfaces';
import { ElementMatcher, ViewportMacther } from './matchers';
import { checkAndCreateFolder } from '../utils';


export class VisualRegression {
  private config: Config = Config.get();
  
  constructor(options: ServiceOptions) {
    this.config.patch({ folder: options.folder });
  }

  before() {
    this.setupFolders();

    browser.addCommand('matchElement', (name: string, element: WebdriverIOAsync.Element) => {
      const elementMatcher = new ElementMatcher(element);
      return elementMatcher.match(name);
    });

    browser.addCommand('matchViewport', (name: string) => {
      const viewportMatcher = new ViewportMacther();
      return viewportMatcher.match(name);
    });
  }

  private setupFolders(): void {
    checkAndCreateFolder(this.config.folder);

    for (const key of Object.values(Subfolder)) {      
      const path = resolve(this.config.folder, key);
      checkAndCreateFolder(path);
    }
  }
}
