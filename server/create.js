module.exports = function createServer(Koa, app, joinPath, nullableLogger, extendConfig, options) {
  options = options || {};
  let configs = options.config ? [options.config] : [];
  let serverRoot = configs.length > 0 && configs[0].root ? configs[0].root : options.serverRoot
  let config = extendConfig({ root: serverRoot, configs});
  console.log('!!!config=', config)
  let logger = createLogger(nullableLogger, config, options);

  let appServer = new Koa();
  let { ip, port=8080, env = appServer.env } = config;

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

  const extend = (options = {}) => {
    let config = extendConfig({root: options.serverRoot, configs: options.config ? [server.config, options.config] : [server.config]});

    server.logger = createLogger(server.logger, config, options);
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

function createLogger(defaultLogger, config, options) {
  let logger = defaultLogger;

  if(options.createLogger) {
    logger = options.createLogger(config);
  }

  if(options.logger) {
    logger = options.logger;
  }

  return logger;
}
