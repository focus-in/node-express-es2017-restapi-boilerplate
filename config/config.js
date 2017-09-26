const env = require('./env');
const log = require('./log');

/**
 * Load Environment (.env) variables
 */
class Config {

  constructor() {
    this.env = env;
    this.log = log;
  }

  init() {
    console.log('--config init');
    this.env.load();
    console.log('--log init');
    this.log.load(this.env);
  }

}

module.exports = new Config;
