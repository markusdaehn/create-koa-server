const { assert } = require('chai');
const extend = require('./index');
const path = require('path');

describe('server.config.extend -- integration', () => {
  context('when given a config path that doesn\'t exist', () => {
    it('should return a config with the list of configs merged', () => {
      let root = 'root/does/not/exist';
      let configs =[{a: 'a'}, {b: 'b'}, {a: 'c', appName: 'a madeup name'}];
      let expectedConfig = {a:'c', b: 'b', appName: 'a madeup name'};

      let config = extend({root, configs});

      assert.deepEqual(config, expectedConfig, 'The config was not correct');
    });
  });
  context('when given a config path that does exist and configs passed in options', () => {
    it('should return a config with the config from the path merged with the list of configs', () => {
      let root = path.resolve(__dirname, '../../../tests/scenarios/server/basic');
      let configs =[{a: 'a'}, {b: 'b'}, {a: 'c', appName: 'a madeup name'}];
      let expectedConfig = {
        a: 'c',
        b: 'b',
        env: 'test',
        ip: undefined,
        port: 8080,
        root: '/Users/markusdaehn/Documents/sdf/create-koa-server/tests/scenarios/server/basic',
        appName: 'basic-app-test',
        logging:
         {
           level: 'error',
           path: '/Users/markusdaehn/Documents/sdf/create-koa-server/tests/scenarios/server/basic/logs/log.txt'
         }
       };
      let config = extend({root, configs});

      assert.deepEqual(config, expectedConfig, 'The config was not correct');
    });
  });
  context('when given a config path that does exist and no configs passed in options', () => {
    it('should return a config with the config from the path', () => {
      let root = path.resolve(__dirname, '../../../tests/scenarios/server/basic');
      let expectedConfig = {
        env: 'test',
        ip: undefined,
        port: 8080,
        root: '/Users/markusdaehn/Documents/sdf/create-koa-server/tests/scenarios/server/basic',
        appName: 'basic-app-test',
        logging:
         {
           level: 'error',
           path: '/Users/markusdaehn/Documents/sdf/create-koa-server/tests/scenarios/server/basic/logs/log.txt'
         }
       };
      let config = extend({root});

      assert.deepEqual(config, expectedConfig, 'The config was not correct');
    });
  });
});
