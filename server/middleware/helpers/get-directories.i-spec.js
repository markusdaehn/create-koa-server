const getDirectories = require('./get-directories');
const constants = require('./constants');
const fs = require('fs');
const path = require('path');
const sinon = require('sinon');
const { assert } = require('chai');

describe('server middleware plugins get-directories -- integration', () => {
  const server = {root: path.resolve(__dirname, '../..')};
  const expected_plugin_directories = [
    '0_test1-plugin',
    '1_test2-plugin'
  ];

  let sandbox;
  let logger;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    logger = createLogger(sandbox);
  });

  afterEach(() => {
    sandbox.restore();
  });

  context('when passed the plugin folder', () => {
    it(`should return the list of directory paths in the ${server.root}${constants.PLUGINS_FOLDER} directory`, () => {
      let directories = getDirectories(fs, path, constants.PLUGINS_FOLDER, server, logger);

      directories.forEach((directory) => {
        assert.isTrue(expected_plugin_directories.includes(directory.name), `The directory ${directory.name} was not an expected directory`);
      });
    });
  });
});


function createLogger(sandbox) {
  return {
    info: sandbox.spy(),
    debug: sandbox.spy(),
    trace: sandbox.spy()
  };
}
