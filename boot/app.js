const server = require('./server');
const logger = require('./logger');
// const mongoose = require('./mongoose');

/**
 * Load all the dependencies to boot the application
 * export the app to start from server
 */
class App
{

  constructor(server) {
    this.server = server;
    // this.logger = logger;
  }

  boot() {
    console.log('--app boot');
    this.server.init();
  }
}

module.exports = new App(server);

// -----------------------


// open mongoose connection
// mongoose.connect();

// listen to requests
// app.listen(port, () => console.info(`server started on port ${port} (${env})`));

/**
* Exports express
* @public
*/
// module.exports = app;
