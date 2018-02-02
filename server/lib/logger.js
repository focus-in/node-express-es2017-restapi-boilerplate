// dependencies
const _ = require('lodash');
const winston = require('winston');

class Logger
{

  // constructor() { }

  init() {
    // add logger with no transports by default
    this.logger = new winston.Logger({
      level: 'debug',
      // format: winston.format.json(),
      transports: [],
      exitOnError: false
    });
  }

  /**
   * load
   * @param {object} config
   */
  load(config) {
    // check file & console log
    if (config.log.consoleLog) {
      this._addConsoleLog(config);
    }
    if (config.log.fileLog) {
      this._addFileLog(config);
    }

    return this;
  }

  _addConsoleLog(config) {
    return this.logger.add(winston.transports.Console, {
      colorize: true,
      showLevel: true,
      handleExceptions: true,
      humanReadableUnhandledException: true
    });
  }

  _addFileLog(config) {
    return this.logger.add(winston.transports.File, {
      filename: config.log.logPath,
      colorize: true,
      timestamp: true,
      maxsize: config.log.maxsize,
      maxFiles: config.log.maxFiles,
      json: config.log.json,
      eol: '\n',
      tailable: true,
      showLevel: true,
      handleExceptions: true,
      humanReadableUnhandledException: true
    });
  }

  getMorganStream() {
    return {
      stream: {
        write: (msg) => {
          this.logger.info(msg);
        }
      }
    };
  }

  log(level, msg, params={}) {
    this.logger.log(level, msg, params);
  }

  info(msg, params={}) {
    this.logger.info(msg, params);
  }

  error(msg, params={}) {
    this.logger.error(msg, params);
  }
}

module.exports = Logger;
