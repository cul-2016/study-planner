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
  },
  {
    method: 'GET',
    path: '/assessment',
    handler: handlers.assessment.list
  },
  {
    method: 'POST',
    path: '/log-time',
    handler: handlers.assessment.logTime
  },
  {
    method: 'POST',
    path: '/schedule',
    handler: handlers.week.updateSchedule
  },
  {
    method: 'GET',
    path: '/schedule',
    handler: handlers.week.getSchedule
  },
  {
    method: 'POST',
    path: '/login',
    handler: handlers.auth.login
  }
]
