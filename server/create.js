module.exports = function (koa, logger, config, middleware) {
  const server = createServer(koa, logger, config);
  const { hooks, plugins } = middleware;

  hooks.errorHandler.register(server, logger);

  plugins.register(server, logger);

  hooks.router.register(server, logger);

  return server;
}


function createServer(koa, logger, config) {
  const app = new koa();
  const { ip, port, root, env=app.env } = config.server;

  const SERVER_LISTENING_MSG = `Koa server listening on ${ip}:${port} in ${env} mode`;
  const SERVER_CLOSED_MSG = `Koa server closed on ${ip}:${port} in ${env} mode`;

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
    return beforeStart ? beforeStart().then(() => { return listen(); }) : listen();
  };

  const stop = (beforeStop) => {
    return beforeStop ? beforeStop().then(() => { return close(); }) : close();
  };

  return {
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
