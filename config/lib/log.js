const _ = require('lodash');
const chalk = require('chalk');

/**
 * Log Configurations
 */
class Log
{

  constructor() {
    // define valid & default formats
    this.formats = ['combined', 'common', 'dev', 'short', 'tiny'];
    // default log format
    this.logFormat = 'combined';
    // default log path
    this.logPath = 'app.log';
    // default levels
    this.levels = ['error', 'warn', 'info', 'verbose', 'debug', 'silly'];
    // log level
    this.logLevel = 'debug';
    // log transports
    this.fileLog = false;
    this.consoleLog = false;
  }

  load(config) {
    // varify & load the log format
    this._loadLogFormat(config);
    // load log path
    this._loadLogPath(config);
    // define log debug & transports
    this._loadLogTransports(config);

    return this;
  }

  /**
   * The format to use with the logger
   *
   * @param {*} config
   * @return {string} log format
   */
  _loadLogFormat(config) {
    // make sure we have a valid format
    if (!_.includes(this.formats, config.log.format)) {
      console.log();
      console.log(chalk.yellow(this.env.msg.WARNING.INVALID_LOG_FORMAT));
      console.log();
    } else {
      // assign the log format
      this.logFormat = config.log.format;
    }

    return this.logFormat;
  }

  /**
   * Log path
   *
   * @param {*} config.log
   * @return {string} log path
   */
  _loadLogPath(config) {
    // make sure we have a valid format
    if (!_.isEmpty(config.log.fileLogger.directoryPath) && !_.isEmpty(config.log.fileLogger.fileName)) {
      this.logPath = config.log.fileLogger.directoryPath + config.log.fileLogger.fileName;
    }

    return this.logPath;
  }

  /**
   * Define log level & transports
   * @param {object} config
   */
  _loadLogTransports(config) {
    // check the valid log level
    if (_.includes(this.levels, config.log.level)) {
      this.logLevel = config.log.level;
    }
    // log transports
    this.consoleLog = config.log.consoleLog;
    this.fileLog = config.log.fileLog;

    // filelogger configs
    this.maxsize = config.log.fileLogger.maxsize ? config.log.fileLogger.maxsize : 10485760;
    this.maxFiles = config.log.fileLogger.maxFiles ? config.log.fileLogger.maxFiles : 2;
    this.json = config.log.fileLogger.json ? config.log.fileLogger.json : false;

    return this;
  }

}

module.exports = Log;
