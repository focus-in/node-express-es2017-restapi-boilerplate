const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const msg = require('../message');

/**
 * Load Environment (.env) variables
 */
class Env
{

  constructor() {
    this.envPath = this._getEnvConfigPath();
  }

  load() {
    // check env config file exists
    this._checkEnvFileExists();
    // load the env config file
    this._loadEnvFile();
    // Console ENV
    console.log(chalk.white('--'));
    console.log(chalk.green(msg.INFO.APP_RUNNING_ENV));
    console.log(chalk.white('--'));
  }

  getEnvConfig() {
    return require(path.join(__dirname, 'configs'));
  }

  // get env config path
  _getEnvConfigPath() {
    // check NODE_ENV
    if (!process.env.NODE_ENV) {
      process.env.NODE_ENV = 'local';
      console.error(chalk.yellowBright(msg.WARNING.NO_NODE_ENV));
    }
    return path.join(__dirname, '.env.' + process.env.NODE_ENV);
  }

  // allow empty values to dotenv-safe
  _allowEmptyValues() {
    return (process.env.NODE_ENV === 'production') ? false : true;
  }

  // check config file is exists
  _checkEnvFileExists() {
    if (!fs.existsSync(this.envPath)) {
      console.error(chalk.red(msg.ERROR.NO_ENV_CONFIG));
      // exit from application
      process.exit(1);
    }
    return true;
  }

  // load env file dotenv-safe
  _loadEnvFile() {
    require('dotenv-safe').load({
      allowEmptyValues: this._allowEmptyValues(),
      path: this.envPath,
      sample: path.join(__dirname, '.env.sample'),
    });
  }

}

module.exports = new Env;
