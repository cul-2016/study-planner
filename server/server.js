const Hapi = require('hapi');

const routes = require('./routes.js');

const server = Hapi.server({
    host: 'localhost',
    port: 8000
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
