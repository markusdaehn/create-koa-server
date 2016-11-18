const glob = require('glob');
const path = require('path');
const fs = require('fs');
//const directories = getDirectories('.').join(',');

const routes = glob.sync(`./**/index.js`, { cwd: __dirname, ignore:['./*']}).map(function(file) {
  return require(path.resolve(__dirname, file));
});

module.exports = routes;

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}
