// dependencies
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const compress = require('compression');
const queryType = require('query-types');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const logger = require('./logger');

class Express
{

  constructor() {
    this.express = express();
    // default port
    this.port = 3000;
  }

  init() {
    // Initialize Express middleware
    this._initMiddleware();

    // Initialize request variables
    this._initRequestVariables();

    // Initialize static path
    this._initStaticPath();

    // Initialize Helmet security headers
    this._initHelmetHeaders();

    return this;
  }

  load(config, logger) {

    // allow CORS
    this._allowCORS(config);

    // enable logger
    this._enableLogger(config, logger);

    // load local variable to request object
    this._loadLocalVariables(config);

    // load port from config
    this.port = config.env.variables.port;

    return this;
  }


  start() {
    // Start the app by listening on <port>
    this.express.listen(this.port);

    return this;
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

    // parse body params and attache them to req.body with 10mb payload
    this.express.use(bodyParser.json({ limit: '10mb' }));
    this.express.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

    // lets you use HTTP verbs such as PUT or DELETE
    // in places where the client doesn't support it
    this.express.use(methodOverride());

    // query parser middleware
    this.express.use(queryType.middleware());

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

  /**
   * init static path to use with domain
   */
  _initStaticPath() {
    // adding the static path values
    this.express.use('/storage', express.static(`${process.cwd()}/storage`));
  }

  /**
   * secure apps by setting various HTTP headers
   */
  _initHelmetHeaders() {
    // Use helmet to secure Express headers
    this.express.use(helmet());
    this.express.use(helmet.hsts({
      maxAge: 31536000, // ONE YEAR
      includeSubdomains: true,
      force: true
    }));
  }

  /**
   * enable CORS - Cross Origin Resource Sharing
   */
  _allowCORS(config) {
    // cors config options
    const corsOption = {
      'origin': '*',
      'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
      'preflightContinue': false,
      'optionsSuccessStatus': 200
    }

    this.express.use(cors(corsOption));

    // Enable jsonp # http://expressjs.com/th/api.html#app.settings.table
    this.express.enable('jsonp callback');
  }

  /**
   * enable api access log with morgan
   */
  _enableLogger(config, logger) {
    this.express.use(morgan(config.log.logFormat, logger.getMorganStream()));
  }


  _loadLocalVariables(config) {
    // Environment dependent middleware
    if (config.env.variables.env === 'production') {
      app.locals.cache = 'memory';
    }
  }

}

module.exports = Express;
