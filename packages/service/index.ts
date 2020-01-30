import { resolve } from 'path';

import { ServiceOptions } from '../interfaces';
import { checkAndCreateFolder } from '../utils';
import { DEFAULT_FOLDER } from '../constants';


export class ComparisonService {
  private config: Partial<ServiceOptions> = {
    folder: resolve(process.cwd(), DEFAULT_FOLDER)
  };
  
  constructor(config: ServiceOptions) {
    this.config = { ...this.config, ...config };
  }

  async before() {
    checkAndCreateFolder(this.config.folder);

    // browser.addCommand('matchElement', () => {});
  }
}
