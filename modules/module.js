// dependencies

class Module
{

  load(config) {

    // asset to current property
    this.asset = config.asset;

    // load Module models files
    this._loadModuleModels();
    // Load modules routes files
    this._loadModuleRoutes();
    // load Module configuration files
    this._loadModuleConfigs();
    // Load modules events files
    this._loadModuleEvents();
    // load Module helpers files
    this._loadModuleHelpers();

    return this;
  }

  /**
   * Invoke module models
   */
  _loadModuleModels() {
    this.asset.load('models');
  }

  /**
   * Invoke module routes
   */
  _loadModuleRoutes() {
    this.asset.load('routes');
  }

  /**
   * Invoke module configurations
   */
  _loadModuleConfigs() {
    this.asset.load('configs');
  }

  /**
   * Invoke module events
   */
  _loadModuleEvents() {
    this.asset.load('events');
  }

  /**
   * Invoke module helpers
   */
  _loadModuleHelpers() {
    this.asset.load('helpers');
  }

}

module.exports = Module;
