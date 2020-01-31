const { ComparisonService } = require('./build');


exports.config = {
  runner: 'local',
  specs: [
    'e2e/**/*.e2e-spec.ts'
  ],
  capabilities: [{
    maxInstances: 1,
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: ['--headless', '--disable-gpu']
    }
  }],
  logLevel: 'silent',
  baseUrl: 'http://example.com/',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  services: [
    'selenium-standalone',
    [ComparisonService]
  ],
  framework: 'jasmine',
  reporters: ['spec'],
  jasmineNodeOpts: {
    defaultTimeoutInterval: 60000,
  },
  before: () => {
    require('ts-node').register({ project: 'e2e/tsconfig.e2e.json' });
  }
}
