import { mkdirSync, existsSync } from 'fs';
import { DEFAULT_FOLDER } from './constants';


export function checkAndCreateFolder(path = DEFAULT_FOLDER) {
  if (path && !existsSync(path)) {
    mkdirSync(path);
  }
}
