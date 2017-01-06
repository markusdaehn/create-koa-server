module.exports = function createServer(Koa, app, nullableLogger, deepMerge, options) {
  let { config, logger = nullableLogger} = options;

  let appServer = new Koa();
  let { ip, port=8080, root:serverRoot, env = appServer.env } = config || {};

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
    let { config = {}, logger } = options || {};
    let { ip, port, root:serverRoot, env } = config;

    server.config = deepMerge(server.config, config);
    server.logger = logger || server.logger;
    server.ip = ip || server.ip;
    server.port = port || server.port;

    if(serverRoot) {
      server.roots.push(serverRoot);
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
