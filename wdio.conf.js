const path = require('path');
const { VisualRegression } = require('./build');


exports.config = {
  runner: 'local',
  specs: [
    'e2e/main.e2e-spec.ts'
  ],
  capabilities: [{
    maxInstances: 1,
    browserName: 'chrome'
  }],
  logLevel: 'error',
  baseUrl: 'http://example.com/',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  services: [
    'selenium-standalone',
    [VisualRegression, {
      outputDir: path.resolve(process.cwd(), './e2e/regression'),
      instanceFolder: ({ browserName, browserVersion }) => {
        const [ version ] = browserVersion.split('.');
        return `${ browserName }_${ version }`;
      }
    }]
  ],
  framework: 'jasmine',
  reporters: ['spec'],
  jasmineNodeOpts: {
    defaultTimeoutInterval: 60000,
  },
  before: () => {
    require('ts-node').register({
      project: 'e2e/tsconfig.json',
      files: true
    });
  }
}
