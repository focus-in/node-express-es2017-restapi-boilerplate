// dependencies
const Logger = require('./lib/logger');
const Express = require('./lib/express');
const Mongoose = require('./lib/mongoose');

class Server
{

  constructor() {
    this.logger = new Logger();
    // this.error = new ErrorHandler();
    // this.exception = new ExceptionHandler();
    this.express = new Express();
    this.mongoose = new Mongoose();
  }

  init() {
    // init logger
    this.logger.init();
    // init mongosse
    this.mongoose.init();
    // init express
    this.express.init();

    return this;
  }

  load(config) {
    // load the logger with config
    this.logger.load(config);
    // load mongoose
    this.mongoose.load(config, this.logger);
    // load the server configs
    this.express.load(config, this.logger);

    return this;
  }

  start(config) {
    return Promise.resolve()
      .then(() => this.mongoose.start())
      .then(() => this.express.start())
      .then(() => {
        // Logging initialization
        this.logger.info('--');
        this.logger.info(config.env.variables.app.title);
        this.logger.info(`Environment:\t ${config.env.variables.env}`);
        this.logger.info(`Port:\t\t ${config.env.variables.port}`);
        this.logger.info(`Database:\t\t ${this.mongoose.db.uri}`);
        if (typeof config.env.variables.app.secure.ssl !== 'undefined') {
          this.logger.info('HTTPs:\t\t on');
        }
        this.logger.info(`App version:\t ${config.package.version}`);
        this.logger.info('--');
      });
  }




}

module.exports = Server;
