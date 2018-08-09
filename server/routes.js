const Path = require('path');
const handlers = require('./handlers');

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
  },
  {
    method: 'POST',
    path: '/assessment',
    handler: handlers.assessment.add
  }
]
