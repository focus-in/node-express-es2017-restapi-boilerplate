// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const app = require('./app');

/**
 *
 */

console.log('--app started');
app.init();
// app.config()
//   .then(app.boot)
//   .then(app.start)
//   .catch((err) => {
//     console.log(err);
//     process.exit();
//   });
