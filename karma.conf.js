const webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    coverageReporter: {
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'lcovonly', subdir: '.' },
      ]
    },
    files: [
      './app/**/*-test.js'
    ],
    frameworks: [
      'jasmine',
    ],
    preprocessors: {
      './app/**/*-test.js' : ['webpack', 'sourcemap']
    },
    reporters: ['progress', 'coverage'],
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: true,
    concurrency: Infinity
  });
};
