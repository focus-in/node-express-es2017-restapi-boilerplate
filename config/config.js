const env = require('./env/env');

/**
 * Load Environment (.env) variables
 */
class Config
{
  constructor(env) {
    this.env = env;
  }

  load() {
    this.env.load();
  }
}

module.exports = new Config(env);
