// dependencies
const path = require('path');
const _ = require('lodash');

const Env = require('./env/env');
const Asset = require('./assets/asset');

/**
 * Configuration
 */
class Config
{

  constructor() {
    this.env = new Env();
    this.asset = new Asset();
    this.package = {};

    // some of the mandatory variables to start application
    this.mandatoryVariables = [
      'env', 'port', 'host', 'db.host', 'db.port', 'db.name', 'jwt.jwtSecret'
    ];
  }

  init() {
    // init the env variables
    this.env.init();

    // init the asset file paths
    this.asset.init();

    // read package json for project info
    this._readPackageJson();
  }

  load() {
    // load env variables
    this.env.variables = this.env.load();

    // load asset files
    this.asset.files = this.asset.load();

    /*
    // validate env variables
    const envValidate = this._validateEnvVariables(this.env.variables);

    // validate secure mode
    const secureValidate = this._validateSecureMode(this.env.variables);

    // validate JWT session
    const jwtValidate = this._validateJwtSecure();

    // check all our validation pass
    if (!envValidate || !secureValidate || !jwtValidate) {
      console.error('Validation fails breaking application exit');
      // exit from application
      process.exit(1);
    }
    */
  }

  // read the package json for version & app info
  _readPackageJson() {
    // require package json
    this.package = require(path.resolve('./package.json'));
    // return the package info
    return this.package;
  }

  /*
  // validate environment variables
  _validateEnvVariables(variables) {
    let pass = true;
    // validate all mandatory fields has value in env
    _.forEach(this.mandatoryVariables, (mandatoryVar) => {
      if (!_.has(variables, mandatoryVar) || _.isEmpty(variables[mandatoryVar])) {
        pass = false;
        return false;
      }
    });
    if (!pass) {
      console.error('Some of the mandatory env variable missing to start application');
      console.log(this.mandatoryVariables.join(', '));
      // console.error(chalk.red(msg.ERROR.NO_ENV_CONFIG));
    }
    return pass;
  }

  // Validate Secure=true because it requires certs and key files to be available
  _validateSecureMode(variables) {
    if (!variables.app.secure || variables.app.secure.ssl !== true) {
      return true;
    }

    const privateKey = fs.existsSync(path.resolve(variables.app.secure.privateKey));
    const certificate = fs.existsSync(path.resolve(variables.app.secure.certificate));
    if (!privateKey || !certificate) {
      console.log(chalk.red('+ Error: Certificate file or key file is missing, falling back to non-SSL mode'));
      // console.log(chalk.red('  To create them, simply run the following from your shell: sh ./scripts/generate-ssl-certs.sh'));
      console.log();
      variables.app.secure.ssl = false;
    }
  }

  // Validate JWT Secret parameter
  _validateJwtSecure(variables) {

    if (variables.env !== 'production') {
      return true;
    }

    if (variables.jwt.jwtSecret === 'MEAN') {
      console.log(chalk.red('+ WARNING: It is strongly recommended that you change sessionSecret config while running in production!'));
      console.log(chalk.red('  Please add `sessionSecret: process.env.SESSION_SECRET || \'super amazing secret\'` to '));
      console.log(chalk.red('  `config/env/production.js` or `config/env/local.js`'));
      console.log();
      return false;
    }

    return true;
  }
  */

}

module.exports = Config;
