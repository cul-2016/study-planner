const AWS = require('aws-sdk-mock');
const test = require('tape');

const weekHandlers = require('../server/handlers/week.js');
const update = weekHandlers.updateSchedule;
const get = weekHandlers.getSchedule;

const validPayload = {
  user_id: "TEST",
  schedule: 6
}

const invalidPayload = {}

test('add valid schedule test', function (t) {
  t.plan(1);
  update({payload: JSON.stringify(validPayload)})
  .then(res => {
    t.deepEqual(res, {ok: true}, "Schedule updated successfully");
  })
});

test('update invalid schedule test', function (t) {
  t.plan(1);
  update({payload: JSON.stringify(invalidPayload)})
  .then(res => {
    t.equal(res.message, "missing required params", "Schedule not updated");
  })
});

test('get schedule test', function (t) {
  t.plan(1);
  get().then(res => {
    t.deepEqual(res, {ok: true, schedule: 360}, "Schedule got correctly");
  })
});
