const Hapi = require('hapi');

const routes = require('./routes.js');

const server = Hapi.server({
  port: process.env.PORT || 5000,
  routes: {
    cors: true
  }
});

const plugins = [
  require('inert')
]

async function start() {
  try {
    await server.register(plugins);
    server.route(routes);
    await server.start();
  }
  catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log('Server running at:', server.info.uri);
};

start();

module.exports = server;
