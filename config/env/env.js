// dependencies
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const dotEnv = require('dotenv-safe');

const msg = require('../lib/messages');

/**
 * Load Environment (.env) variables
 */
class Env
{

  constructor() {
    // load the env variables
    this.variables = {};
    // get the env config path
    this._envPath = this._getEnvConfigPath();
  }

  // init the env configuration
  init() {
    // check env config file exists
    this._checkEnvFileExists();
    // load the env config file
    this._initEnvFile();

    return this;
  }

  // load the env variables
  load() {
    // reload the variables with process env fields
    this.variables = require('./variables');

    return this;
  }

  // get env config path
  _getEnvConfigPath() {
    // check NODE_ENV
    if (!process.env.NODE_ENV) {
      process.env.NODE_ENV = 'local';
      console.error(chalk.yellowBright(msg.WARNING.NO_NODE_ENV, process.env.NODE_ENV));
    }
    return path.join(__dirname, `.env.${process.env.NODE_ENV}`);
  }

  // check config file is exists
  _checkEnvFileExists() {
    if (!fs.existsSync(this._envPath)) {
      // error message & exit
      console.error(chalk.red(msg.ERROR.NO_ENV_CONFIG, process.env.NODE_ENV));
      // exit from application
      process.exit(1);
    }
    return true;
  }

  // load env file dotenv-safe
  _initEnvFile() {
    dotEnv.load({
      allowEmptyValues: this._allowEmptyValues(),
      path: this._envPath,
      sample: path.join(__dirname, '.env.sample'),
    });
    return true;
  }

  // allow empty values to dotenv-safe
  _allowEmptyValues() {
    return (process.env.NODE_ENV !== 'production');
  }

}

module.exports = Env;
