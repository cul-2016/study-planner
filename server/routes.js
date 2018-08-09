const Path = require('path');

module.exports = [
  {
    method: 'GET',
    path: '/{path*}',
    handler: {
      directory: {
        path: Path.join(__dirname, '..', 'build'),
        listing: false,
        index: true
      }
    }
  }
]
