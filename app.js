const config = require('./config/config');
const server = require('./lib/server');
// const logger = require('./boot/logger');
// const mongoose = require('./mongoose');

/**
 * Load all the dependencies to boot the application
 * export the app to start from server
 */
class App
{

  constructor() {
    this.config = config;
    // this.server = server;
    // this.logger = logger;
  }

  init() {
    console.log('--app init');
    this.config.init();
  }

  boot() {
    console.log('--app boot');
    // this.server.init();
    return Promise.resolve();
  }

  start() {
    console.log('--app start');
    return Promise.resolve();
  }
}

module.exports = new App;
