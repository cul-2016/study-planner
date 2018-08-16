const AWS = require('aws-sdk-mock');
const test = require('tape');

const assessmentHandlers = require('../server/handlers/assessment.js');
const add = assessmentHandlers.add;
const list = assessmentHandlers.list;

const validPayload = {
  user_id: "TEST",
  name: "test assessment",
  priority: "1",
  date: "2018-09-09",
  type: "exam",
  schedule: 5
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

test('list assessments test', function (t) {
  t.plan(1);
  list().then(res => {
    t.deepEqual(res, {ok: true, assessments: [{name: 'test', type: 'coursework', target: 360, complete: 0}]}, "Assessments listed correctly");
  })
});
