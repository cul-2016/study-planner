const AWS = require('aws-sdk-mock');
const test = require('tape');

AWS.mock('DynamoDB', 'putItem', Promise.resolve());
AWS.mock('DynamoDB', 'query', Promise.resolve({Items: [{Name: {S: "test"}, Type: {S:"coursework"}}]}));

const assessmentHandlers = require('../server/handlers/assessment.js');
const add = assessmentHandlers.add;
const list = assessmentHandlers.list;

const validPayload = {
  user_id: "TEST",
  name: "test assessment",
  priority: "1",
  date: "2018-09-09",
  type: "exam"
}

const invalidPayload = {}

test('add valid assessment test', function (t) {
  t.plan(1);
  add({payload: JSON.stringify(validPayload)})
  .then(res => {
    t.deepEqual(res, {ok: true}, "Assessment added successfully");
  })
});

test('add invalid assessment test', function (t) {
  t.plan(1);
  add({payload: JSON.stringify(invalidPayload)})
  .then(res => {
    t.equal(res.message, "missing required params", "Assessment not added");
  })
});

test('add invalid assessment test', function (t) {
  t.plan(1);
  list().then(res => {
    t.deepEqual(res, {ok: true, assessments: [{name: 'test', type: 'coursework'}]}, "Assessments listed correctly");
  })
});

test('after - unmock AWS', function (t) {
  AWS.restore('DynamoDB');
  t.end();
})
