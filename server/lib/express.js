const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const compress = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
// const assets = require('../config/assets/assets');

class Express
{

  constructor() {
    this.express = express();
  }

  init() {
    // Initialize Express middleware
    this._initMiddleware();

    // Initialize request variables
    this._initRequestVariables();

    return this;
  }

  load() {

    // load Module configuration files
    this._loadModuleConfigs();

    // Load modules routes files
    this._loadModuleRoutes();

    return this;
  }

  start() {
    return Promise.resolve()
      .then(() => this.database && this.database.authenticate())
      .then(() => this.server.start());
  }

  /**
   * Initialize application middleware
   */
  _initMiddleware() {
    // compress the request content data
    this.express.use(compress({
      filter: function (req, res) {
        return (/json|text|javascript/).test(res.getHeader('Content-Type'));
      },
      level: 9
    }));

    // parse body params and attache them to req.body
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));

    // lets you use HTTP verbs such as PUT or DELETE
    // in places where the client doesn't support it
    this.express.use(methodOverride());

    // secure apps by setting various HTTP headers
    this.express.use(helmet());

    // enable CORS - Cross Origin Resource Sharing
    this.express.use(cors());

    // disable x-powered-by header
    this.express.disable('x-powered-by');
  }

  /**
   * Add Local variable to resonse header
   */
  _initRequestVariables() {
    // Passing the request url to environment locals
    this.express.use((req, res, next) => {
      res.locals.host = `${req.protocol}://${req.hostname}`;
      res.locals.url = `${req.protocol}://${req.headers.host}${req.originalUrl}`;
      next();
    });
  }



// initAccessLogs() {
//   this.express.use(morgan());
// }



  /**
   * Invoke module configuration
   */
  _loadModuleConfigs() {
    assets.load('config', this.express);
  }

  /**
   * Invoke module routes
   */
  _loadModuleRoutes() {
    assets.load('routes', this.express);
  }



  // console.log(chalk.white('--'));
  // console.log(chalk.green(msg.INFO.APP_RUNNING_ENV));
  // console.log(chalk.white('--'));



}

module.exports = Express;
