# wdio-visual-regression
Visual regression tool for webdriver.io. PR's are welcome!
**Attention:** This module in alpha phase and not recommended for production usage.

### Features
- [x] HTML elements comparison
- [ ] Report generation
- [ ] Integration with Git and CI for accepting expected images

### How to use
1. Build the source code
```bash
npm run build
```
2. Import `VisualRegression` class from build folder and provide it to service option
```js
const { VisualRegression } = require('./build');

services: [VisualRegression, {/* options */}]
```

### Options
1. *folder* (required: false, default: 'regression') - working directory

## Getting Started
Follow to commands below for start dev environment

```bash
git clone git@github.com:ennjin/wdio-visual-regression.git
cd wdio-visual-regression
npm ci
```
For development mode
```bash
npm run start
```
For production build
```bash
npm run build
```

## Running the tests
For running e2e tests type command
```bash
npm run e2e
```

## Built With
* [node-canvas](https://github.com/Automattic/node-canvas) - HTML5 canvas implementation for nodejs
* [Resemble.js](https://github.com/rsmbl/Resemble.js) - Image analysis and comparison

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details
