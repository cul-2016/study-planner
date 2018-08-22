const AWS = require('aws-sdk-mock');
const test = require('tape');
const jwt = require('jsonwebtoken');

const weekHandlers = require('../server/handlers/week.js');
const update = weekHandlers.updateSchedule;
const get = weekHandlers.getSchedule;

const token = jwt.sign({user_details: {user_id: 1}}, process.env.JWT_SECRET);

const validPayload = {
  user_id: "TEST",
  schedule: 6
}

const invalidPayload = {}

test('add valid schedule test', function (t) {
  t.plan(1);
  update({payload: JSON.stringify(validPayload),state: {token: token}})
  .then(res => {
    t.deepEqual(res, {ok: true}, "Schedule updated successfully");
  })
});

test('update invalid schedule test', function (t) {
  t.plan(1);
  update({payload: JSON.stringify(invalidPayload),state: {token: token}})
  .then(res => {
    t.equal(res.message, "missing required params", "Schedule not updated");
  })
});

test('get schedule test', function (t) {
  t.plan(1);
  get({state: {token: token}}).then(res => {
    t.deepEqual(res, {ok: true, schedule: 360}, "Schedule got correctly");
  })
});
