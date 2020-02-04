# wdio-visual-regression
Visual regression tool for webdriver.io. PR's are welcome!
**Attention:** This module in alpha phase and not recommended for production usage.

### Features
- [x] HTML elements comparison
- [ ] Report generation
- [ ] Integration with Git and CI for accepting expected images

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
