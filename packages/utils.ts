import { resolve } from 'path';
import { existsSync, writeFileSync, readFileSync, mkdirSync } from 'fs';

import { Config, Subfolder } from './config';


export function checkAndCreateFolder(path: string): void {
  if (!existsSync(path)) {
    mkdirSync(path);
  }
}

export function saveImage(name: string, subfoler: Subfolder, data: Buffer): void {
  const path = resolvePath(name, subfoler);
  writeFileSync(path, data);
}

export function getImage(name: string, subfoler: Subfolder): Buffer | null {
  const path = resolvePath(name, subfoler);
  return existsSync(path) ? readFileSync(path) : null;
}

export function resolvePath(name: string, subfolder: Subfolder): string {
  const config = Config.get();
  return resolve(config.instanceDir, subfolder, `${ name }.png`);
}

export function isCallable(fn?: Function): boolean {
  return typeof fn === 'function';
}
