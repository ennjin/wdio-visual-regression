import { mkdirSync, existsSync } from 'fs';
import { DEFAULT_FOLDER } from './constants';


export function checkAndCreateFolder(path: string) {
  const dir = path && existsSync(path) ? path : DEFAULT_FOLDER;
  mkdirSync(dir);
}
