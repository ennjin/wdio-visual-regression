import { resolve } from 'path';

import { Config, DEFAULT_FOLDER, SUBFOLDERS } from './config';
import { ServiceOptions } from './models';
import { checkAndCreateFolder } from '../utils';


export class ComparisonService {
  private config: Config = Config.get();
  
  constructor(options: ServiceOptions) {
    this.config.patch({ folder: options?.folder ?? DEFAULT_FOLDER })
  }

  before() {
    this.setupFolders();
  }

  private setupFolders(): void {
    checkAndCreateFolder(this.config.folder);

    for (const i of SUBFOLDERS) {
      const path = resolve(this.config.folder, i);
      checkAndCreateFolder(path);
    }
  }
}
