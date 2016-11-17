const getDirectories = require('./get-directories');
const fs = require('fs');
const path = require('path');
const sinon = require('sinon');
const { assert } = require('chai');

describe('server middleware plugins get-directories -- integration', () => {
  const expected_directories = [
    '0_body-parser',
    '1_logger'
  ];

  let sandbox;
  let logger;
  let server;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    logger = createLogger(sandbox);
    server = {root: path.resolve(__dirname, '../..')};
  });

  afterEach(() => {
    sandbox.restore();
  });

  context('when passed the current dirname', () => {
    it('should return the list of directory paths in the current directory', () => {
      let directories = getDirectories(fs, path, server, logger);

      directories.forEach((directory) => {
        assert.isTrue(expected_directories.includes(directory.name), `The directory ${directory.name} was not an expected directory`);
      });
    });
  });
});


function createLogger(sandbox) {
  return {
    info: sandbox.spy(),
    debug: sandbox.spy()
  };
}
