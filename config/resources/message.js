/**
 * Messages throughout the application
 *
 * export: errorMessage, warningMessage, infoMessage, successMessage
 */
module.exports = {

  ERROR: {
    INVALID_ENV_CONFIG: 'ERROR: Invalid env config %s - kill application',
    NO_ENV_CONFIG: 'ERROR: No env file found for %s - kill application'
  },

  WARNING: {
    NO_NODE_ENV: 'WARNING: NODE_ENV is not defined! Using default (%s) environment.',
    INVALID_LOG_FORMAT: 'WARNING: Invalid log format! Using the default format %s'
  },

  INFO: {
    APP_RUNNING_ENV: 'INFO App running in %s ENV'
  },

  SUCCESS: {

  }

};
