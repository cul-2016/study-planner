const AWS = require('aws-sdk-mock');
const test = require('tape');

AWS.mock('DynamoDB', 'putItem', Promise.resolve());
AWS.mock('DynamoDB', 'query', Promise.resolve({Items: [{Name: {S: "test"}, Type: {S:"coursework"}}]}));

const server = require('../server/server.js');

const endpoints = [
  {
    method: 'POST',
    path: '/assessment',
    payload: {
      valid: {
        user_id: "TEST",
        name: "test assessment",
        priority: "1",
        date: "2018-09-09",
        type: "exam"
      },
      invalid: {}
    }
  },
  {
    method: 'GET',
    path: '/assessment'
  }
]

endpoints.forEach(e => {
  test(`Valid Endpoint test - ${e.method} ${e.path}`, function (t) {
    t.plan(1);

    let options = {
      method: e.method,
      url: e.path
    }

    if (e.payload) {
      options.payload = e.payload.valid;
    }

    server.inject(options)
    .then(res => {
      t.equal(res.statusCode, 200, `${e.method} - ${e.path}`);
    })
    .catch(err => t.fail(err));
  });
});

endpoints.forEach(e => {
  if (e.payload) {
    test(`Invalid Endpoint test - ${e.method} ${e.path}`, function (t) {
      t.plan(1);

      let options = {
        method: e.method,
        url: e.path,
        payload: e.payload.invalid
      }

      server.inject(options)
      .then(res => {
        t.notEqual(res.statusCode, 200, `${e.method} - ${e.path}`);
      })
      .catch(err => t.fail(err));
    });
  }
});

test('after - unmock AWS', function (t) {
  AWS.restore('DynamoDB');
  server.stop();
  t.end();
});
