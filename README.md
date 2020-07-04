# wdio-visual-regression
Visual regression tool for webdriver.io based on [resemble.js](https://github.com/rsmbl/Resemble.js). PR's are welcome!

[![npm](https://img.shields.io/npm/v/wdio-visual-regression)](https://www.npmjs.com/package/wdio-visual-regression)
[![GitHub](https://img.shields.io/github/license/ennjin/wdio-visual-regression)](https://github.com/ennjin/wdio-visual-regression/blob/master/LICENSE)


### Features
- [x] Default matchers for compare active viewport and elements
- [x] Simple and flexible API for creating custom matcher
- [x] Output report (Jasmine, Mocha, Cucumber) in JSON format ([example](docs/REPORT_EXAMPLE.md))

### How to use
1. Install the package
```bash
npm install --save-dev wdio-visual-regression
```
2. Import `VisualRegression` class and add it to service option in your webdriverio config file
```js
const { VisualRegression } = require('wdio-visual-regression');

exports.config = {
  // other configuration
    services: [
        [VisualRegression, {/* options */}]
    ]
}
```
**Note:** You can find out all available options [here](docs/OPTIONS.md)

3. Use available commands:
```ts
browser.matchElement(name: string, element: WebdriverIO.Element): Promise<number>
browser.matchViewport(name: string): Promise<number>
```

Or create your own custom matcher for comparing anything that you need. See how to do it [here](docs/CUSTOM_MATCHERS.md)

Also, you can take a look at example usage [here](e2e/main.e2e-spec.ts)

## Getting Started
Follow to commands below for start dev environment

```bash
git clone git@github.com:ennjin/wdio-visual-regression.git
cd wdio-visual-regression
npm ci
```
For start development
```bash
npm run start
```
For production build
```bash
npm run build
```

## Running the tests
For running the tests type command
```bash
npm run e2e
```

## Built With
* [node-canvas](https://github.com/Automattic/node-canvas) - HTML5 canvas implementation for nodejs
* [Resemble.js](https://github.com/rsmbl/Resemble.js) - Image analysis and comparison

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details
