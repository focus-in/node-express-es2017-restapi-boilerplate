/**
 * Asset files wildcard path
 *
 * export: controllers, models, routes, configs
 */
module.exports = {
  all: ['index.js', 'app.js', 'config/**/*.js', 'server/**/*.js', 'modules/**/*.js'],
  configs: 'modules/*/configs/*.js',
  controllers: 'modules/*/controllers/*.js',
  helpers: 'modules/*/helpers/*.js',
  events: 'modules/*/events/*.js',
  models: 'modules/*/models/*.js',
  routes: 'modules/*/routes/*.js'
};
