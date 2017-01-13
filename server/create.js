const CONFIG_FOLDER_REL_PATH = 'config';

module.exports = function createServer(Koa, app, joinPath, nullableLogger, deepMerge, createConfig, options) {
  options = options || {};

  let config = buildConfig(joinPath, deepMerge, createConfig, nullableLogger, options.envVars, options.config, options.serverRoot);
  let logger = createLogger(nullableLogger, config);

  let appServer = new Koa();
  let { ip, port=8080, root:serverRoot, env = appServer.env } = config;

  let httpServer = null;
  let apps;
  let server;
  let serverRoots = [serverRoot];


  const listen = () => {
    return new Promise(function(resolve, reject) {
      httpServer = appServer.listen(server.port, server.ip, (error) => {
        if(error) {
          reject(error);
        } else {
          logger.info(`Koa server listening on ${server.ip || ''}:${server.port} in ${server.env} mode`);
          resolve();
        }
      });
    });
  };

  const close = () => {
    return new Promise((resolve, reject) => {
      if(!httpServer) resolve();

      httpServer.close((error) => {
        if(error) {
          reject(error);
        } else {
          httpServer = null;
          logger.info(`Koa server closed on ${server.ip || ''}:${server.port} in ${server.env} mode`);
          resolve();
        }
      });
    });
  };

  const start = (beforeStart) => {
    apps = app.createApps(serverRoots, server.logger);
    apps.forEach((app) => app.register(server, server.logger));

    return beforeStart ? beforeStart(server, server.config, server.logger).then(() => { listen(); }) : listen();
  };

  const stop = (beforeStop) => {
    return beforeStop ? beforeStop(server, server.logger).then(() => { return close(); }) : close();
  };

  const extend = (options) => {
    let config = buildConfig(joinPath, deepMerge, createConfig, server.logger, options.envVars, options.config, options.serverRoot);

    server.logger = createLogger(server.logger, config);
    server.config = deepMerge(server.config, config);
    server.ip = ip || server.ip;
    server.port = port || server.port;

    if(config.root) {
      server.roots.push(config.root);
    }

    return server;
  };

  server = {
    ip,
    port,
    roots: serverRoots,

    get httpServer() {
      return httpServer;
    },
    get apps() {
      return apps;
    },
    appServer,

    config,
    logger,

    start,
    stop,
    extend,

    use: appServer.use.bind(appServer),
    emit: appServer.emit.bind(appServer),

    env
  };

  return server;
}

function buildConfig(joinPath, deepMerge, createConfig, logger, envVars = {}, config = {}, serverRoot = null) {
  config.root = serverRoot || config.root;

  let configPath = joinPath(config.root, CONFIG_FOLDER_REL_PATH);

  if(config.root) {
    config = deepMerge(createConfig(logger, envVars, configPath), config)
  }

  return config;
}

function createLogger(defaultLogger, options) {
  let logger = defaultLogger;

  if(options.createLogger) {
    logger = createLogger(config);
  }

  if(options.logger) {
    logger = options.logger;
  }

  return logger;
}
