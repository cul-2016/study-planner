const AWS = require('aws-sdk');

const getTarget = require('../helpers/getTarget.js');
const parsePayload = require('../helpers/parsePayload.js');
const getCurrentWeek = require('../helpers/getCurrentWeek.js');

const ep = new AWS.Endpoint(process.env.DYNAMO_ENDPOINT);
const dynamoDB = new AWS.DynamoDB({region: 'eu-west-2', endpoint: ep});

async function updateSchedule(request, h) {
  const { schedule } = parsePayload(request.payload);

  if (!schedule) {
    return new Error("missing required params");
  }

  const params = {
    Key: {
      "UserId": { S: 'TEST' }, // TODO: replace with user id
      "Week": { S: getCurrentWeek() }
    },
    UpdateExpression: 'SET Schedule = :s',
    ExpressionAttributeValues: {
      ':s': { N: `${schedule * 60}` }
    },
    TableName: 'quodl-study-planner-weeks'
  }

  return await dynamoDB.updateItem(params).promise()
  .then(res => {
    return {ok: true}
  })
  .catch(err => {
    console.log(err);
    return err
  });
}

async function getSchedule(request, h) {
  const params = {
    Key: {
      "Week": { S: getCurrentWeek() },
      "UserId": { S: 'TEST' } // TODO: replace with user id
    },
    TableName: 'quodl-study-planner-weeks'
  }

  return await dynamoDB.getItem(params).promise()
  .then(res => {
    if (res.Item) {
      return {ok: true, schedule: res.Item.Schedule.N}
    }
    return {ok: true, schedule: 360}
  })
  .catch(err => {
    console.log(err);
    return err
  });
}

module.exports = {
  updateSchedule,
  getSchedule
};
