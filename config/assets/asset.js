// dependencies
const _ = require('lodash');
const glob = require('glob');
const path = require('path');
const files = require('./files');

/**
 * Load all asset files when required
 */
class Asset
{

  constructor() {
    this.files = [];
  }

  // init all the glob file paths
  init() {
    // module models file path
    this.files.models = this._fileGlobbedPaths(files.models);
    // module configs file path
    this.files.configs = this._fileGlobbedPaths(files.configs);
    // module routes file path
    this.files.routes = this._fileGlobbedPaths(files.routes);
    // module events file path
    this.files.events = this._fileGlobbedPaths(files.events);
    // module helpers file path
    this.files.helpers = this._fileGlobbedPaths(files.helpers);
  }

  // get all the globbed file path
  load() {
    // check fileType in files
    // if (_.has(this.assertFiles, fileType)) {
    //   const files = glob.sync(this.files[fileType]);
    //   files.map((file) => {
    //     const fileName = _.replace(file, '.js', '');
    //     return require(path.resolve(fileName));
    //   });
    // }
    // return true;
  }



  /**
   * get the file globbed path
   *
   * @param {any [array|string]} globFiles assert glob file path
   * @param {any [array|string]} excludes exclude file path
   */
  _fileGlobbedPaths(globFiles, excludes='') {
    // URL paths regex
    const urlRegex = new RegExp('^(?:[a-z]+:)?//', 'i');

    // The output array
    let output = [];

    // If glob pattern is array then we use each pattern in a recursive way, otherwise we use glob
    if (_.isArray(globFiles)) {
      globFiles.forEach((globFile) => {
        output = _.union(output, this._fileGlobbedPaths(globFile, excludes));
      });
    } else if (_.isString(globFiles)) {
      // test regex if no wildcard just push the file
      if (urlRegex.test(globFiles)) {
        output.push(globFiles);
      } else {
        let filePath = glob.sync(globFiles);
        if (excludes) {
          filePath = filePath.map((file) => {
            if (_.isArray(excludes)) {
              _.forEach(excludes, (i) => {
                file = file.replace(excludes[i], '');
              });
            } else {
              file = file.replace(excludes, '');
            }
            return file;
          });
        }
        output = _.union(output, filePath);
      }
    }

    return output;
  }

}

module.exports = Asset;
