const _ = require('lodash');
const glob = require('glob');
const path = require('path');
/**
 * Load all asset files when required
 */
class Assets
{

  constructor() {
    this.files = {
      all: ['index.js', 'config/**/*.js', 'boot/**/*.js', 'modules/**/*.js'],
      controllers: 'modules/*/controllers/**/*.js',
      models: 'modules/*/models/**/*.js',
      routes: 'modules/*/routes/**/*.js',
      config: 'modules/*/config/*.js'
    }
  }

  load(fileType, express) {
    // check fileType in files
    if (_.has(this.files, fileType)) {
      var files = glob.sync(this.files[fileType]);
      files.map(function (file) {
        var fileName = _.replace(file, '.js', '');
        require(path.join(__dirname, '../' + fileName));
      });
    }
  }
}

module.exports = new Assets;
