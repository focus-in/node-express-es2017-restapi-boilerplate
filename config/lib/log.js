const _ = require('lodash');

/**
 * Log Configurations
 */
class Log
{

  constructor() {
    this.formats = ['combined', 'common', 'dev', 'short', 'tiny'];
    this.defaultFormat = 'combined';
  }

  load(env) {
    this.env = env;
    this._getLogFormat(env.configs);
    // check env config file exists
    // this._checkEnvFileExists();
    // load the env config file
    // this._loadEnvFile();
    // Console ENV
    // console.log(chalk.white('--'));
    // console.log(chalk.green(msg.INFO.APP_RUNNING_ENV));
    // console.log(chalk.white('--'));
  }


  /**
   * The format to use with the logger
   *
   * Returns the log.format option set in the current environment configuration
   */
  _getLogFormat(config) {
    // make sure we have a valid format
    if (!_.includes(this.formats, config.log.format)) {
      console.log();
      console.log(chalk.yellow(this.env.msg.WARNING.INVALID_LOG_FORMAT));
      console.log();
      if (process.env.NODE_ENV === 'production') {
        // exit from application
        process.exit(1);
      }
      // return the default format
      return this.defaultFormat;
    }
    return config.log.format;
  }
}

module.exports = new Log;
