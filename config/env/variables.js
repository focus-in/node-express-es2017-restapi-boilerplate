/**
 * Env configs
 */
module.exports = {
  // app title
  app: {
    id: process.env.APP_ID,
    title: process.env.APP_TITLE,
    secret: process.env.APP_SECRET,
    secure: {
      ssl: process.env.APP_SECURE_SSL,
      privateKey: process.env.APP_SECURE_KEY,
      certificate: process.env.APP_SECURE_CERT,
      caBundle: process.env.APP_SECURE_BULDLE
    }
  },
  // env
  env: process.env.NODE_ENV,
  // port which app to run
  port: process.env.PORT,
  // host name
  host: process.env.HOST,
  // URL. ex: https://www.myapp.com (including port if required).
  domain: process.env.DOMAIN,
  // application debug for local & development env
  debug: process.env.DEBUG,
  // DB configurations - mongodb://localhost:27017/db-name
  db: {
    // mongodb connection uri
    uri: process.env.MONGO_URI,
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    name: process.env.MONGO_DB_NAME,
    debug: process.env.MONGO_DEBUG,
    credentials: {
      username: process.env.MONGO_USER,
      password: process.env.MONGO_PASS
    },
    options: {}
  },
  // JWT Auth session config - https://github.com/themikenicholson/passport-jwt
  jwt: {
    // jwtSecret
    jwtSecret: process.env.JWT_SECRET,
    // key to pass in each http request
    requestKey: process.env.JWT_REQUEST_KEY,
    // expire time for token
    jwtExpire: process.env.JWT_EXPIRE
  },
  // logging with Morgan & Winston
  // - https://github.com/expressjs/morgan
  // - https://github.com/winstonjs/winston
  log: {
    // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
    format: process.env.LOG_FORMAT,
    // file logger configurations
    fileLogger: {
      directoryPath: process.env.LOG_PATH,
      fileName: process.env.LOG_FILE,
      maxsize: process.env.LOG_MAX_SIZE,
      maxFiles: process.env.LOG_MAX_FILES,
      json: process.env.LOG_JSON
    },
    level: process.env.LOG_LEVEL,
    consoleLog: process.env.LOG_IN_CONSOLE,
    fileLog: process.env.LOG_IN_FILE
  },
  // mailing with nodemailer - https://github.com/nodemailer/nodemailer
  mailer: {
    from: process.env.MAILER_FROM,
    // mailer auth options
    options: {
      service: process.env.MAILER_SERVICE_PROVIDER,
      auth: {
        user: process.env.MAILER_EMAIL_ID,
        pass: process.env.MAILER_PASSWORD
      }
    }
  },
  // seed db with dummy data - https://github.com/seanemmer/mongoose-seed
  seedDB: {
    seed: process.env.MONGODB_SEED,
    options: {
      logResults: process.env.MONGODB_SEED_LOG_RESULTS
    },
    // db model collections
    collections: [
      {
        model: 'User',
        data: [],
        dataFile: ''
      }
    ]
  }
};
