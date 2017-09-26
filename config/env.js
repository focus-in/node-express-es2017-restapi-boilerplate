const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const chalk = require('chalk');
const dotEnv = require('dotenv-safe');
const msg = require('./resources/message');

/**
 * Load Environment (.env) variables
 */
class Env
{

  constructor() {
    this.environments = ['local', 'development', 'test', 'production'];
    this.defaultEnv = 'local';
    // get the env config path
    this.envPath = this._getEnvConfigPath();
    // env configs file path
    this.envConfigsPath = path.join(__dirname, 'env/configs');
    // message save in object
    this.msg = msg;
    // all env variables will assign to this object
    this.configs = {};
  }

  load() {
    console.log('--env load');
    // check env config file exists
    this._checkEnvFileExists();
    // load the env config file
    this._loadEnvFile();
    // get all the env configs in current object
    this.configs = this.get();
    // Console ENV
    console.log(chalk.white('--'));
    console.log(chalk.green(this.msg.INFO.APP_RUNNING_ENV), process.env.NODE_ENV);
    console.log(chalk.white('--'));
  }

  /**
   * Get all the env configurations
   * @return {object} envConfigs
   */
  get() {
    return require(this.envConfigsPath);
  }

  // get env config path
  _getEnvConfigPath() {
    // check NODE_ENV
    if (!process.env.NODE_ENV) {
      process.env.NODE_ENV = this.defaultEnv;
      // console.error(chalk.yellowBright(this.msg.WARNING.NO_NODE_ENV), this.defaultEnv);
    }
    // check ENV is valid
    if (!_.includes(this.environments, process.env.NODE_ENV)) {
      console.error(chalk.red(this.env.msg.ERROR.INVALID_ENV_CONFIG));
      // exit from application
      process.exit(1);
    }
    return path.join(__dirname, 'env/.env.' + process.env.NODE_ENV);
  }

  // check config file is exists
  _checkEnvFileExists() {
    if (!fs.existsSync(this.envPath)) {
      console.error(chalk.red(this.msg.ERROR.NO_ENV_CONFIG), process.env.NODE_ENV);
      // exit from application
      process.exit(1);
    }
    return true;
  }

  // load env file dotenv-safe
  _loadEnvFile() {
    dotEnv.load({
      allowEmptyValues: this._allowEmptyValues(),
      path: this.envPath,
      sample: this.envPath
    });
    return Promise.resolve();
  }

  // allow empty values to dotenv-safe
  _allowEmptyValues() {
    return (process.env.NODE_ENV === 'production') ? false : true;
  }

}

module.exports = new Env;
