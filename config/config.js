// dependencies
const path = require('path');
const _ = require('lodash');
const fs = require('fs');
const chalk = require('chalk');

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
  }

  init() {
    // init the env variables
    this.env.init();

    // init the asset file paths
    this.asset.init();

    // read package json for project info
    this._readPackageJson();

    return this;
  }

  load() {
    // load env variables
    this.env.load();

    // validate env variables
    this._validateEnvVariables(this.env.variables);

    // validate secure mode
    this._validateSecureMode(this.env.variables);

    // validate JWT session
    this._validateJwtSecure(this.env.variables);

    return this;
  }

  // read the package json for version & app info
  _readPackageJson() {
    // require package json
    this.package = require(path.resolve('./package.json'));
    // return the package info
    return this.package;
  }

  // validate environment variables
  _validateEnvVariables(variables) {
    if (_.isEmpty(variables)) {
      return false;
    }
    // can do other env specific validations if required
    return true;
  }

  // Validate Secure=true because it requires certs and key files to be available
  _validateSecureMode(variables) {

    if (!variables.app.secure || !variables.app.secure.ssl) {
      return true;
    }

    // check the secure file path are valid
    const keyPath = variables.app.secure.privateKey;
    const certPath = variables.app.secure.certificate;
    const privateKey = fs.existsSync(path.resolve(keyPath));
    const certificate = fs.existsSync(path.resolve(certPath));
    if (keyPath === '' || certPath === '' || !privateKey || !certificate) {
      console.log(chalk.red('+ Error: Certificate file or key file is missing, falling back to non-SSL mode'));
      console.log(chalk.red('+ Note: To create them, simply run the following from your shell: sh ./scripts/generate-ssl-certs.sh'));
      console.log();
      variables.app.secure.ssl = false;
    }

    return true;
  }

  // Validate JWT Secret parameter
  _validateJwtSecure(variables) {

    // test the jwt secret keyword
    const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{32,})');
    if (!strongRegex.test(variables.jwt.jwtSecret)) {
      console.log(chalk.red('+ WARNING: It is strongly recommended that you change strong JWTSecret config while running in production!'));
      console.log(chalk.red('  Please add `JWT_SECRET: \'super amazing secret\'` to .env file'));
      console.log(chalk.red('+ Note: To create them, simply run the following from your shell: sh ./scripts/generate-strong-secret.sh'));
      console.log();
      return false;
    }

    return true;
  }

}

module.exports = Config;
