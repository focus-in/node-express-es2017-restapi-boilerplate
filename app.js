// dependencies
const Config = require('./config/config');
const Server = require('./server/server');
// const logger = require('./logger');
// const mongoose = require('./mongoose');

/**
 * Load all the dependencies to boot the application
 * export the app to start from server
 */
class App
{

  constructor() {
    this.config = new Config();
    this.server = new Server();
    // this.logger = logger;
  }

  init() {
    // init config
    this.config.init();
    // init server
    this.server.init();

    console.log('init success');
    // Console ENV
    // console.log(chalk.white('--'));
    // console.log(chalk.green(msg.INFO.APP_RUNNING_ENV));
    // console.log(chalk.white('--'));


  }

  load() {
    this.config.load();

    console.log('load success');
  }



  start() {
    console.log('will begin start');
    // open mongoose connection
    // mongoose.connect();

    // listen to requests
    // app.listen(port, () => console.info(`server started on port ${port} (${env})`));
  }
}

module.exports = App;
