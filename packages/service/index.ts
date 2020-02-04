import { resolve } from 'path';

import { Config, DEFAULT_FOLDER, Subfolder } from './config';
import { ServiceOptions } from './models';
import { ElementImage } from './element-image';
import { checkAndCreateFolder } from '../utils';


export class ComparisonService {
  private config: Config = Config.get();
  
  constructor(options: ServiceOptions) {
    this.config.patch({
      folder: options?.folder ?? DEFAULT_FOLDER
    });
  }

  before() {
    this.setupFolders();

    browser.addCommand('matchElement', (name: string, element: WebdriverIOAsync.Element) => {
      const elementImage = new ElementImage(element);
      return elementImage.compare(name);
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
