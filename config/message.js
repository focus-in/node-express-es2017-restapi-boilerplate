/**
 * Messages throughout the application
 *
 * export: errorMessage, warningMessage, infoMessage, successMessage
 */
module.exports = {

  ERROR: {
    NO_ENV_CONFIG: 'ERROR: No env file found for ' + process.env.NODE_ENV + ' - kill application'
  },

  WARNING: {
    NO_NODE_ENV: 'WARNING: NODE_ENV is not defined! Using default (local) environment.'
  },

  INFO: {
    APP_RUNNING_ENV: 'INFO App running in ' + process.env.NODE_ENV + ' ENV'
  },

  SUCCESS: {

  }

};
