// dependencies
const Logger = require('./lib/logger');
const Express = require('./lib/express');

class Server
{

  constructor() {
    this.logger = new Logger();
    // this.error = new Logger();
    // this.exception = new Logger();
    this.express = new Express();
    // this.mongoose = new Express();
  }

  init() {
    // init express
    this.express.init();

    return this;
  }

  load() {

    // load Module configuration files
    this._loadModuleConfigs();

    // Load modules routes files
    this._loadModuleRoutes();

    return this;
  }

  start() {
    return Promise.resolve()
      .then(() => this.database && this.database.authenticate())
      .then(() => this.server.start());
  }

  /**
   * Invoke module configuration
   */
  _loadModuleConfigs() {
    assets.load('config', this.express);
  }

  /**
   * Invoke module routes
   */
  _loadModuleRoutes() {
    assets.load('routes', this.express);
  }



  // console.log(chalk.white('--'));
  // console.log(chalk.green(msg.INFO.APP_RUNNING_ENV));
  // console.log(chalk.white('--'));



}

module.exports = Server;
