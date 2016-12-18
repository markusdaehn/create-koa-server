module.exports = function (Koa, mounts, config, logger) {
  logger.trace('server.create > : creating server');
  const server = createServer(Koa, config, logger);

  server.mounts = mounts.register(server, logger);

  logger.trace('server.create < ');
  return server;
}

function createServer(Koa, config, logger) {
  const app = new Koa();

  const { ip, port, root, env = app.env } = config.server;

  const SERVER_LISTENING_MSG = `Koa server listening on ${ip || ''}:${port} in ${env} mode`;
  const SERVER_CLOSED_MSG = `Koa server closed on ${ip || ''}:${port} in ${env} mode`;

  let server = null;
  const listen = () => {
    return new Promise(function(resolve, reject) {
      server = app.listen(port, ip, (error) => {
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
      if(!server) resolve();

      server.close((error) => {
        if(error) {
          reject(error);
        } else {
          server = null;
          logger.info(SERVER_CLOSED_MSG);
          resolve();
        }
      });
    });
  };

  const start = (beforeStart) => {
    return beforeStart ? beforeStart(app, config, logger).then(() => { return listen(); }) : listen();
  };

  const stop = (beforeStop) => {
    return beforeStop ? beforeStop(server, logger).then(() => { return close(); }) : close();
  };

  return {
    get instance() {
      return server;
    },
    root,
    config,

    start,
    stop,

    app,
    use: app.use.bind(app),
    emit: app.emit.bind(app),
    get env() {
      return env;
    }
  };
}
