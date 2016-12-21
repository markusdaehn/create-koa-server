module.exports = function (Koa, apps, config, logger) {
  logger.trace('server.create > : creating server');
  const server = createServer(Koa, config, logger);

  apps.register(server, logger);

  logger.trace('server.create < ');
  return server;
}

function createServer(Koa, config, logger) {
  const appServer = new Koa();
  const { ip, port, root, env = appServer.env } = config.server;

  const SERVER_LISTENING_MSG = `Koa server listening on ${ip || ''}:${port} in ${env} mode`;
  const SERVER_CLOSED_MSG = `Koa server closed on ${ip || ''}:${port} in ${env} mode`;

  let httpServer = null;
  const listen = () => {
    return new Promise(function(resolve, reject) {
      httpServer = appServer.listen(port, ip, (error) => {
        if(error) {
          reject(error);
        } else {
          logger.info(SERVER_LISTENING_MSG);
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
          logger.info(SERVER_CLOSED_MSG);
          resolve();
        }
      });
    });
  };
  let server;
  const start = (beforeStart) => {
    return beforeStart ? beforeStart(server, config, logger).then(() => { return listen(); }) : listen();
  };

  const stop = (beforeStop) => {
    return beforeStop ? beforeStop(server, logger).then(() => { return close(); }) : close();
  };

  return server = {
    get httpServer() {
      return httpServer;
    },
    appServer,
    root,
    config,

    start,
    stop,

    use: appServer.use.bind(appServer),
    emit: appServer.emit.bind(appServer),
    env
  };
}
