import { mkdirSync, existsSync } from 'fs';


export function checkAndCreateFolder(path: string) {
  if (!existsSync(path)) {
    mkdirSync(path);
  }
}
