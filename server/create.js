module.exports = function createServer(Koa, appFactory, nullableLogger, extend, getConfigs, options) {
  options = options || {};

  let {
    config={},
    createLogger=()=>{ return nullableLogger; },
    logger,
    serverRoot
  } = options;

  config = extend(config, getConfigs(serverRoot, logger));

  let { ip, port, env } = config;
  let appServer = new Koa();
  let httpServer, apps;

  server = {
    get ip() { return ip || 8080},
    port,
    httpServer,
    apps,
    appServer,

    config,
    logger,

    start(options) { return start(this, options); },
    stop(options) { return stop(this, options); },
    create(options) { return create(this, options); },
    init() { return init(this, appFactory, createLogger); },

    use: appServer.use.bind(appServer),
    emit: appServer.emit.bind(appServer),

    get env() {
      return env || appServer.env;
    }
  };

  return server;
}

function init(server, appFactory, createLogger) {
  server.logger = server.logger || createLogger(server.config.logging);
  server.apps = appFactory.createApps(server.config, server.logger);
  server.apps.forEach((app) => app.register(server, server.logger));
}

function create(server, options={}) {
  options.config = options.config ? extend(server.config, options.config) : server.config;
  options.logger = options.logger || server.logger;
  options.createLogger = options.createLogger || server.createLogger;

  return createServer(Koa, app, nullableLogger, extend, getConfigs, options)
}

function listen (server) {
  return new Promise(function(resolve, reject) {
    server.httpServer = server.appServer.listen(server.port, server.ip, (error) => {
      if(error) {
        reject(error);
      } else {
        server.logger.info(`Koa server listening on ${server.ip || ''}:${server.port} in ${server.env} mode`);
        resolve();
      }
    });
  });
};

function close (server) {
  return new Promise((resolve, reject) => {
    if(!server.httpServer) resolve();

    server.httpServer.close((error) => {
      if(error) {
        reject(error);
      } else {
        server.httpServer = null;
        server.logger.info(`Koa server closed on ${server.ip || ''}:${server.port} in ${server.env} mode`);
        resolve();
      }
    });
  });
};

function start (server, options={}) {
  let { beforeStart } = options;

  server.init();

  return beforeStart ? beforeStart(server, server.config, server.logger).then(() => { listen(server); }) : listen(server);
};

function stop (server, options={}) {
  let { beforeStop } = options;

  return beforeStop ? beforeStop(server, server.logger).then(() => { return close(server); }) : close(server);
};
