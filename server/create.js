module.exports = function (koa, logger, ip, port, middleware) {
  const server = createServer(koa, ip, port, logger);
  const { hooks, plugins } = middleware;

  hooks.errorHandler.register(app, logger)

  Object.keys(plugins).forEach((pluginName)=> {
    plugins[pluginName].register(app, logger);
  });

  hooks.router.register(app, logger);

  return server;
}


function createServer(koa, ip, port, logger) {
  const SERVER_LISTENING_MSG = `Koa server listening on ${ip}:${port} in ${app.env} mode`;
  const SERVER_CLOSED_MSG = `Koa server closed on ${ip}:${port} in ${app.env} mode`;
  const app = new koa();

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
          logger.info(SERVER_LISTENING_MSG);
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
    root: __dirname,
    start,
    stop,

    use: app.use.bind(app),
    app
  };
}
