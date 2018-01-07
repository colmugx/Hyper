// Karma configuration
// Generated on Sun Jan 07 2018 22:33:53 GMT+0800 (CST)

const webpackConf = require('../../.electron-vue/webpack.renderer.config')

module.exports = function(config) {
  config.set({

    basePath: '',
    browsers: ['visibleElectron'],
    frameworks: ['mocha', 'chai'],
    files: [
      'specs/*.spec.js'
    ],
    customLaunchers: {
      'visibleElectron': {
        base: 'Electron',
        flags: ['--show']
      }
    },
    exclude: [
    ],
    preprocessors: {
      'specs/*.spec.js': ['webpack'],
    },
    webpack: webpackConf,
    webpackMiddleware: {
      noInfo: true
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity
  })
}
