const AWS = require('aws-sdk-mock');
const test = require('tape');
const jwt = require('jsonwebtoken');

const assessmentHandlers = require('../server/handlers/assessment.js');
const add = assessmentHandlers.add;
const list = assessmentHandlers.list;

const token = jwt.sign({user_details: {user_id: 1}}, process.env.JWT_SECRET);

const validPayload = {
  user_id: "TEST",
  name: "test assessment",
  priority: "1",
  date: "2018-09-09",
  type: "exam",
  schedule: 5
}

const invalidPayload = {};

test('add valid assessment test', function (t) {
  t.plan(1);
  add({payload: JSON.stringify(validPayload), state: {token: token}}, {})
  .then(res => {
    t.deepEqual(res, {ok: true}, "Assessment added successfully");
  })
});

test('add invalid assessment test', function (t) {
  t.plan(1);
  add({payload: JSON.stringify(invalidPayload), state: {token: token}}, {})
  .then(res => {
    t.equal(res.message, "missing required params", "Assessment not added");
  })
});

test('list assessments test', function (t) {
  t.plan(1);
  list({state: {token: token}}, {}).then(res => {
    t.deepEqual(res, {ok: true, assessments: [{name: 'test', type: 'coursework', target: 360, complete: 0}]}, "Assessments listed correctly");
  })
});
