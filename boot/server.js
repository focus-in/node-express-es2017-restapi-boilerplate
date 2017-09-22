const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const compress = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const assets = require('../config/assets');

class Server
{

  constructor(express) {
    this.express = express();
  }

  init() {

    console.log('server init');
    // Initialize Express middleware
    this.initMiddleware();

    // Initialize request variables
    this.initRequestVariables();

    // Initialize Modules configuration
    this.initModuleConfigs();

    // Initialize modules server routes
    this.initModuleRoutes();

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
  initMiddleware() {
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
  };

  /**
   * Add Local variable to resonse header
   */
  initRequestVariables() {
    // Passing the request url to environment locals
    this.express.use(function (req, res, next) {
      res.locals.host = req.protocol + '://' + req.hostname;
      res.locals.url = req.protocol + '://' + req.headers.host + req.originalUrl;
      next();
    });
  }

  /**
   * Invoke module configuration
   */
  initModuleConfigs() {
    assets.load('config', this.express);
  };

  /**
   * Invoke module routes
   */
  initModuleRoutes() {
    assets.load('routes', this.express);
  };

}

module.exports = new Server(express);
