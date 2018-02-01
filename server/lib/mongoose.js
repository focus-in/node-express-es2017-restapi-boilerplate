// dependencies.
const chalk = require('chalk');
const Promise = require('bluebird');
const mongoose = require('mongoose');

// Mongoose
class Mongoose
{

  // constructor() {

  // }

  init() {
    this.db = {};

    // init mongoose promise default to bluebird
    mongoose.Promise = Promise;
  }

  load(config) {
    // get only the db Config values
    const dbConfig = config.env.variables.db;
    // set db connect uri
    this.db.uri = _setDbUri(dbConfig);
    // define db config options
    this.db.options = _defineDbOptions(dbConfig);
    // db debug config
    this.db.debug = dbConfig.debug;
  }

  start() {
    this._connect();
  }

  stop() {
    this._disconnect();
  }

  _loadModels(callback) {
    // Globbing model files
    config.files.server.models.forEach((modelPath) => {
      require(path.resolve(modelPath));
    });

    if (callback) callback();
  }

  _setDbUri(dbConfig) {

    // start the url value from mongoose uri
    let mongooseUri = dbConfig.uri;

    // check username & password are not empty
    if (!_.isEmpty(dbConfig.credentials.username) && !_.isEmpty(dbConfig.credentials.username)) {
      mongooseUri += `${dbConfig.credentials.username}:${dbConfig.credentials.password}@`;
    }

    mongooseUri += dbConfig.host;

    // check for port
    if (!_.isEmpty(dbConfig.port)) {
      mongooseUri += `:${dbConfig.port}`;
    }

    // check and append dbname
    if (!_.isEmpty(dbConfig.name)) {
      mongooseUri += `/${dbConfig.name}`;
    }

    return mongooseUri;
  }

  _defineDbOptions(dbConfig) {
    let dbOptions = {
      useMongoClient: true,
      autoIndex: false, // Don't build indexes
      reconnectTries: 5, // stop trying after 5 reconnect
      reconnectInterval: 500, // Reconnect every 500ms
      poolSize: 10, // Maintain up to 10 socket connections
      // If not connected, return errors immediately rather than waiting for reconnect
      bufferMaxEntries: 0,
      promiseLibrary: Promise // make bluebird as default promise library
    };
    // merge with config options for env specific values
    dbOptions = _.merge(dbOptions, dbConfig.options);

    return dbOptions;
  }

  // Initialize Mongoose
  _connect(cb) {

    mongoose.connect(this.db.uri, this.db.options, (err) => {
      // Log Error
      if (err) {
        console.error(chalk.red('Could not connect to MongoDB!'));
        console.log(err);
      } else {

        // Enabling mongoose debug mode if required
        mongoose.set('debug', this.db.debug);

        // Call callback FN
        if (cb) cb(db);
      }
    });

  }

  _disconnect(cb) {
    mongoose.disconnect((err) => {
      console.info(chalk.yellow('Disconnected from MongoDB.'));
      cb(err);
    });
  }

}

// Export the mongoose class
module.exports = Mongoose;
