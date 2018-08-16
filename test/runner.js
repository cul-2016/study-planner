const AWS = require('aws-sdk-mock');
const test = require('tape');

AWS.mock('DynamoDB', 'putItem', Promise.resolve());
AWS.mock('DynamoDB', 'updateItem', Promise.resolve());
AWS.mock('DynamoDB', 'getItem', Promise.resolve({}));
AWS.mock('DynamoDB', 'query', Promise.resolve({Items: [{Name: {S: 'test'}, Type: {S:'coursework'}, Weeks: {M: {}}}]}));

const server = require('../server/server.js');

const tests = [
  'assessment',
  'endpoints',
  'week'
]

tests.forEach(t => {
  require(`./${t}.test.js`);
})

test('after - unmock AWS', function (t) {
  AWS.restore('DynamoDB', 'putItem');
  AWS.restore('DynamoDB', 'updateItem');
  AWS.restore('DynamoDB', 'getItem');
  AWS.restore('DynamoDB', 'query');
  server.stop();
  t.end();
});
