const config = require('../../config/config');
const morgan = require('morgan');
// const winston = require('../config/winston');

class Logger
{
  // constructor(winston) {
  //   // this.logger = new
  // }

  load() {
    // Instantiating the default winston application logger with the Console
    // transport
    // var logger = new winston.Logger({
    //   transports: [
    //     new winston.transports.Console({
    //       level: 'info',
    //       colorize: true,
    //       showLevel: true,
    //       handleExceptions: true,
    //       humanReadableUnhandledException: true
    //     })
    //   ],
    //   exitOnError: false
    // });

    // var logger = new (winston.Logger)({
    //   transports: [
    //     new (winston.transports.Console)(),
    //     new (winston.transports.File)({ filename: 'somefile.log' })
    //   ]
    // });

    // Enable logger (morgan) if enabled in the configuration file
    // if (_.has(config, 'log.format')) {
    //   app.use(morgan(logger.getLogFormat(), logger.getMorganOptions()));
    // }
    // // request logging. dev: console | production: file
    // app.use(morgan(logs));
  }

  log() {
  }

  error() {
  }

  info() {
  }

  warning() {
  }

}

module.exports = Logger;
