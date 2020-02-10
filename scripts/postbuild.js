const { resolve } = require('path');
const { copyFileSync, existsSync } = require('fs');


const TYPINGS_FILE = 'index.d.ts';

function moveTypingsToBuild() {
  const typings = resolve(process.cwd(), `./typings/${ TYPINGS_FILE }`);
  const build = resolve(process.cwd(), './build');

  if (existsSync(typings) && existsSync(build)) {
    copyFileSync(typings, resolve(build, TYPINGS_FILE));
  }
}


if (require.main === module) {
  moveTypingsToBuild();
}
