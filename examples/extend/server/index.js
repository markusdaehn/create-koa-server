const config = require('./config');
let server = require('../../basic/server');
console.log('###server=', server);
server = server.extend({config});
console.log('###server=', server);
module.exports = server;
