module.exports = function create(bunyan, stream, env, appName, config) {
  if(config.enabled === false) {
    return createStub();
  }

  let options = createOptions(bunyan, stream, env, appName, config);
  let logger = bunyan.createLogger(options);

  logger.addSerializers(bunyan.stdSerializers);

  return logger;
}

function createOptions(bunyan, stream, env, name, config){
  const EXCLUDE_ENV_FROM_ROTATING_FILE = ['test', 'development'];
  let { path, level } = config;
  let { period='1d', count=13 } = config.rotatingFile || {};

  let options = {
    name,
    streams: [{
      level,
      stream
    }]
  };

  if(!EXCLUDE_ENV_FROM_ROTATING_FILE.includes(env)){
    options.streams.push({
      type: 'rotating-file',
      period,
      count,
      level,
      path
    });
  }

  return options;
}

function createStub() {
  return {
    fatal: () => {},
    error: () => {},
    warn: () => {},
    debug: () => {},
    info: () => {},
    trace: () => {},
    addSerializers: () => {}
  };
}
