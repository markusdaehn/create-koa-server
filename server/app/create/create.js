module.exports = function create(createMount, Koa, middleware, config, logger)  {
  let app = createApp(createMount, Koa, config, logger);

  middleware.register(app, logger);

  return app;
}

function createApp(createMount, Koa, config, logger)  {
  let instance = new Koa();
  let app = {
    instance,
    roots: config.__appRoots__ || [],
    mountPrefix: config.__mountPrefix__,
    config,

    use: instance.use.bind(instance),
    emit: instance.emit.bind(instance),

    register(server, logger) {
      let mount = createMount(app.mountPrefix, app.instance);

      server.use(mount);

      return app;
    },

    logger
  };

  return app;
}
