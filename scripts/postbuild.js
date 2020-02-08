const { resolve } = require('path');
const { copyFileSync, existsSync } = require('fs');


const TYPINGS_NAME = 'index.d.ts';

function moveTypingsToBuild() {
  const typings = resolve(process.cwd(), `./typings/${ TYPINGS_NAME }`);
  const build = resolve(process.cwd(), './build');

  if (existsSync(typings) && existsSync(build)) {
    copyFileSync(typings, resolve(build, TYPINGS_NAME));
  }
}


if (require.main === module) {
  moveTypingsToBuild();
}
