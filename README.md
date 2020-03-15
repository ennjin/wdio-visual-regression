# wdio-visual-regression
Visual regression tool for webdriver.io based on [resemble.js](https://github.com/rsmbl/Resemble.js). PR's are welcome!

[![npm](https://img.shields.io/npm/v/wdio-visual-regression)](https://www.npmjs.com/package/wdio-visual-regression)
[![GitHub](https://img.shields.io/github/license/ennjin/wdio-visual-regression)](https://github.com/ennjin/wdio-visual-regression/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/ennjin/wdio-visual-regression.svg?branch=master)](https://travis-ci.org/ennjin/wdio-visual-regression)

### Features
- [x] Compare HTML elements
- [x] Compare active viewport
- [x] Create custom matcher methods
- [x] Output JSON report (Jasmine, Mocha, Cucumber) ([example](docs/REPORT_EXAMPLE.md))

### How to use
1. Install the package
```bash
npm install --save-dev wdio-visual-regression
```
2. Import `VisualRegression` class and add this one to service option in your webdriverio config file
```js
const { VisualRegression } = require('wdio-visual-regression');

exports.config = {
  // other configuration
    services: [
        [VisualRegression, {/* options */}]
    ]
}
```
**Note:** You can see available options [here](docs/OPTIONS.md)

3. Use available commands:
```ts
browser.matchElement(name: string, element: WebdriverIOAsync.Element): Promise<Number>
browser.matchViewport(name: string): Promise<Number>
```

Or create and use custom match methods. See more [here](docs/CUSTOM_MATCHERS.md)

Also, you can take a look example usage [here](e2e/main.e2e-spec.ts)

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
