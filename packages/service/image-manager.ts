import { existsSync, writeFileSync, readFileSync } from 'fs';
import { resolve } from 'path';

import { Config, Subfolder } from './config';


export class ImageManager {
  private config: Config = Config.get();

  saveImage(name: string, subfoler: Subfolder, data: Buffer): void {
    const path = this.resolvePath(name, subfoler);
    writeFileSync(path, data);
  }

  getImage(name: string, subfoler: Subfolder): Buffer {
    const path = this.resolvePath(name, subfoler);
    return existsSync(path) ? readFileSync(path) : null;
  }

  private resolvePath(name: string, subfolder: Subfolder): string {
    return resolve(this.config.folder, subfolder, `${ name }.png`);
  }
}
