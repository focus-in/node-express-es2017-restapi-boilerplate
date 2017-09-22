// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

/**
 * Boot the app
 */

const config = require('./config/config');
const app = require('./boot/app');

// load the configs
config.load();
// boot the app
app.boot();
// start the app
// app.boot().start();
