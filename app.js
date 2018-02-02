// dependencies
const Config = require('./config/config');
const Server = require('./server/server');
const Module = require('./modules/module');

/**
 * Load all the dependencies to boot the application
 * export the app to start from server
 */
class App
{

  constructor() {
    // instantiate config
    this.config = new Config();
    // instantiate server
    this.server = new Server();
    // instantiate module
    this.module = new Module();
  }

  // init application with dependent libraries
  init() {
    // init config
    this.config.init();
    // init server
    this.server.init();

    return this;
  }

  // load application libraries with data
  load() {
    // load config libraries
    this.config.load();
    // load the server with config
    this.server.load(this.config);
    // load modules default files
    this.module.load(this.config);

    return this;
  }

  // start application servers
  start() {
    // console.log('will begin start');
    this.server.start(this.config);
    // open mongoose connection
    // mongoose.connect();

    // listen to requests
    // app.listen(port, () => console.info(`server started on port ${port} (${env})`));
    return this;
  }
}

module.exports = App;
