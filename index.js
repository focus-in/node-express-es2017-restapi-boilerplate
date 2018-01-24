// make bluebird default Promise
global.Promise = require('bluebird');

// dependencies
const App = require('./app');

/**
 * App will boot & start from here
 */
const app = new App();

// init the app
app.init();

// load the app
app.load();

// start the app
app.start();
