const getDirectories = require('./get-directories');
const constants = require('../constants');
const fs = require('fs');
const path = require('path');
const sinon = require('sinon');
const { assert } = require('chai');

describe('server middleware plugins get-directories -- integration', () => {
  const server = {root: path.resolve(__dirname, '../../tests/scenarios/basic-server')};
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
      let directories = getDirectories(fs, path, path.join(server.root, constants.PLUGINS_FOLDER), logger);

      assert.lengthOf(directories, expected_plugin_directories.length, 'The directories lenth was expected to be 2');

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
