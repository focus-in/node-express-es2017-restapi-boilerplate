// dependencies

class Module
{

  load(config) {
    console.log(config);
    // // load Module configuration files
    // this._loadModuleConfigs();

    // // Load modules routes files
    // this._loadModuleRoutes();

    return this;
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

module.exports = Module;
