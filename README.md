# create-koa-server
Create a koa server based on standard conventions. It provides a few starter examples to kick start development of an Koa API/Web Server.

## Installation
```sh
npm i --save create-koa-server
```

## Usage
### Extend
You can "extend" a predefined koa server implementation. Once you create a server using the ```create-koa-server```, it returns a server object that has a ```create``` method on it.

The ```create``` method is similar to the ```create-koa-server``` except it loads the previous implementation and then loads the new implementation.

The new implementation can override configs and middleware by simply following the same conventions explained in the applications section below.

### Application
Applications can be defined as either single or multi app.

In the case of a *single app* applications, the routes, middleware, and config are at the server root. This is considered the *root app*.

Directory structure:
```
.
|-- project/
|   |-- server/
|   |   |-- config/
|   |   |-- routes/
|   |   |-- middleware/
|   |   +-- index.js            
|   |
|   +--index.js
```
As for multi app applications, the routes, middleware, and config are place in the applications specific folder.

Directory structure:
```
.
|-- project/
|   |-- server/
|   |   |-- config/
|   |   +-- apps/
|   |       |-- ui/
|   |       |   |-- config/
|   |       |   |-- routes/
|   |       |   +-- middleware/
|   |       +-- api/
|   |           |-- config/
|   |           |-- routes/
|   |           +-- middleware/
|   +--index.js
```
The multi app can also have a root app in the server folder, similar to the single app definition.

#### Routes
The Koa routes are defined in the routes folder. The routes folder is placed in the application specific folder or server root, depending on whether or not the application is a single or multi app (See [Application](#application)).

By convention, a route definition is defined in an index.js file located in a subfolder of the routes folder.

Directory structure:
```
.
|-- project/
|   |-- server/
|   |   +-- routes/
|   |       +-- echo/
|   |           |-- get/
|   |           |  +-- index.js
|   |           |-- post/
|   |              +-- index.js         
```
The index.js file should be a module definition with the exports property set to a function that takes a config and logger and returns route definition:

```js
module.exports = function createRoute(config, logger) {
  return {
    verb: 'get',
    uriTemplate: '/echo',
    endpoint: function * () {

    }
  };
}
```
The route definition contains a verb, uriTemplate, and endpoint properties. These match the verb, path, and middleware options in the verb methods on the [koa-router](https://www.npmjs.com/package/koa-router) module.

#### Middleware
Middleware is broken down into two categories, hooks and plugins. By convention, middleware definitions are place in the middleware folder of the application folder.

Directory structure:
```
.
|-- project/
|   |-- server/
|   |   |-- middleware/
|   |   +-- apps/
|   |      +-- api/
|   |         +-- middleware/
|   +--index.js
```
###### *Hooks*
Hooks allow tapping into the predefined modules, such as the router and global error handler.

For example, to replace the **global error handler**, you would define a folder `error-handler` in the middleware `hooks` folder. The framework requires a `handle-error` with the definition of the handler.

Directory structure:
```
.
|-- project/
|   |-- server/
|   |   |-- middleware/
|   |      +-- hooks/
|   |         +-- error-handler/
|   |            +-- handle-error/
|   |               +-- index.js
|   +--index.js
```
The `handle-error` should define a module that exports a function that takes request context, error, server, and logger.

```js
module.exports = function handleError(context, error, server, logger) {
  context.status = 500;
  context.body = 'Unhandled error';
}
```
To add middleware to the **router**, you would define a folder `router` in the middleware `hooks` folder.

Directory structure:
```
.
|-- project/
|   |-- server/
|   |   |-- middleware/
|   |      +-- hooks/
|   |         +-- router/
|   |            +-- health-checker/
|   |               +-- index.js
|   +--index.js
```
The router hook should define a module the returns an object that with a register function. The function should take the following parameters: router, server, and logger. The router is the instances of the [koa-router](https://www.npmjs.com/package/koa-router); server is the created server, and logger is the create server logger.  
```js
module.exports = {
  register(router, server, logger) {
    router.get('/health-check', () => {
      //Do Something
    }));
  }
};
```

#### Config
###### Standard Config Format
The standard config format can be passed into the server create or start functions or be loaded by placing a config folder in the server root, the *root config*.

NOTE: The loading of the config relies on the [get-confg](https://www.npmjs.com/package/get-conf) node module

```js
module.exports = {
  server: {
    ip: '10.10.107.1',
    port: 8080,
    env: 'production',
    appName: 'my-app',
    logging: {
      level: 'error',
      path: '/my/log/path/log.txt'
    }
  },
  '/': {

  },
  '/ui': {

  }
}
```

Notice there is a ```server``` property. These are the server properties. Below are the descriptions of the properties:

| PROPERTY | TYPE   | DESCRIPTION                                                                                                                                                                                                                                                                                               |
|----------|--------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ip       | string | **Optional**. If the hostname is omitted, the server will accept connections on the [unspecified IPv6 address ](https://en.wikipedia.org/wiki/IPv6_address#Unspecified_address) (::)when IPv6 is available, or the [unspecified IPv4 address](https://en.wikipedia.org/wiki/0.0.0.0) (0.0.0.0) otherwise. |
| port     | number | **Optional**. Defaults to 8080                                                                                                                                                                                                                                                                            |
| env      | string | **Optional**. Defaults NODE_ENV environment variable                                                                                                                                                                                                                                                      |
| appName  | string | **Optional**. This gives your application a name that will be displayed in the startup messages.                                                                                                                                                                                                          |
| logging  | object | **Optional**. This allows you to add a logging config that will be passed into the createLogger                                                                                                                                                                                                           |


The **'/'** is the root application config. You can place any root applications here.

The **'/ui'** is an example of an application specific config.

Each application config will be passed into their corresponding specific application along with the server configuration.

###### Alternate Config Format
There is an alternate config format for the configs that allows you to flatten and place configs closer to where they will be used.

The *root config* can have the server config and root application configs at the same level as shown below:

```js
module.exports = {
  //server
  ip: '10.10.107.1',
  port: 8080,
  env: 'production',
  appName: 'my-app',
  logging: {
    level: 'error',
    path: '/my/log/path/log.txt'
  }
  //root app
  cfg1: 'cfg1',
  cfg2: 'cfg2'
}
```

The application specific configs are placed in there respective folders (See below).


Directory structure:
```
.
|-- project/
|   |-- server/
|   |   |-- config/
|   |   +-- apps/
|   |       |-- ui/
|   |       |   |-- config/
|   |       |   |-- routes/
|   |       |   +-- middleware/
|   |       +-- api/
|   |           |-- config/
|   |           |-- routes/
|   |           +-- middleware/
|   +--index.js
```

NOTE: This alternate configs with be merged and normalized into the *standard config format* internally.
