const ROOT_MOUNT_PREFIX = '/';

const createServer = function (Koa, appFactory, nullableLogger, normalize, extend, getConfigs, options = {}) {
  let {
    config={},
    createLogger=()=>{ return nullableLogger; },
    logger,
    serverRoot
  } = options;

  if(typeof serverRoot === 'string') {
    config = extend(normalize(config), getConfigs(serverRoot, logger));
  }

  let { ip, port=8080, env } = config.server;
  let appServer = new Koa();
  let httpServer, apps;
  server = {
    ip,
    port,
    httpServer,
    apps,
    appServer,

    config,
    logger,

    start(options) { return start(server, options); },
    stop(options) { return stop(server, options); },
    create(options) { return create(server, Koa, appFactory, nullableLogger, normalize, extend, getConfigs, options); },
    init() { return init(server, appFactory, createLogger); },

    use: appServer.use.bind(appServer),
    emit: appServer.emit.bind(appServer),

    get env() {
      return env || appServer.env;
    }
  };
  return server;
}

function init(server, appFactory, createLogger) {
  server.logger = server.logger || createLogger(server.config.server);
  server.apps = appFactory.createApps(server.config, server.logger);
  server.apps.forEach((app) => app.register(server, server.logger));
}

function create(server, Koa, appFactory, nullableLogger, normalize, extend, getConfigs, options={}) {
  options.config = extend(server.config, options.config || {});
  options.logger = options.logger || server.logger;
  options.createLogger = options.createLogger || server.createLogger;
  return createServer(Koa, appFactory, nullableLogger, normalize, extend, getConfigs, options)
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
  return beforeStart ? beforeStart(server, server.config, server.logger).then(() => { return listen(server); }) : listen(server);
};

function stop (server, options={}) {
  let { beforeStop } = options;

  return beforeStop ? beforeStop(server, server.logger).then(() => { return close(server); }) : close(server);
};


module.exports = createServer;
