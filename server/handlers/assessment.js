const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');

const getTarget = require('../helpers/getTarget.js');
const parsePayload = require('../helpers/parsePayload.js');
const getCurrentWeek = require('../helpers/getCurrentWeek.js');

const ep = new AWS.Endpoint(process.env.DYNAMO_ENDPOINT);
const dynamoDB = new AWS.DynamoDB({region: 'eu-west-2', endpoint: ep});

async function add(request, h) {
  const {name, priority, date, type, schedule} = parsePayload(request.payload);

  const { user_details: { user_id } } = await jwt.verify(request.state.token, process.env.JWT_SECRET);

  if (!user_id || !name || !priority || !date || !type || !schedule) {
    return new Error("missing required params");
  }

  const params = {
    'UserId': { S: `${user_id}` },
    'Name': { S: name },
    'Priority': { N: priority },
    'DueDate': { S: date },
    'Type': { S: type },
    'Weeks': { M: {} }
  };

  params.Weeks.M[getCurrentWeek()] = {
    M: {
      'Target': { N: `${getTarget(schedule)}`},
      'ElapsedTime': { N: '0' },
    }
  }

  return await dynamoDB.putItem({
    TableName: process.env.DYNAMO_TABLE_NAME,
    Item: params
  }).promise()
  .then(res => {
    return {ok: true};
  })
  .catch(err => {
    console.log(err);
    return err
  });
}

async function list(request, h) {
  const { user_details: { user_id } } = await jwt.verify(request.state.token, process.env.JWT_SECRET);

  const params = {
    ExpressionAttributeValues: {
      ":v1": {
       S: `${user_id}`
      }
    },
    KeyConditionExpression: "UserId = :v1",
    TableName: process.env.DYNAMO_TABLE_NAME
  };

 return await dynamoDB.query(params).promise()
 .then(res => {
   return {ok: true, assessments: res.Items.map(e => {
     const target = e.Weeks.M[getCurrentWeek()] ? e.Weeks.M[getCurrentWeek()].M.Target.N : getTarget();
     const complete = e.Weeks.M[getCurrentWeek()] ? e.Weeks.M[getCurrentWeek()].M.ElapsedTime.N : 0;

     return {
       name: e.Name.S,
       type: e.Type.S,
       target: target,
       complete: complete
     }
   })};
 })
 .catch(err => {
   console.log(err);
   return err
 });
}

async function logTime(request, h) {
  const {name, elapsed_time} = parsePayload(request.payload);

  const { user_details: { user_id } } = await jwt.verify(request.state.token, process.env.JWT_SECRET);

  const params = {
    Key: {
      "Name": { S: name },
      "UserId": { S: `${user_id}` }
    },
    UpdateExpression: 'ADD Weeks.#WEEK.ElapsedTime :e',
    ExpressionAttributeNames: {
      '#WEEK': getCurrentWeek()
    },
    ExpressionAttributeValues: {
      ':e': { N: elapsed_time }
    },
    TableName: process.env.DYNAMO_TABLE_NAME
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

module.exports = {
  add,
  list,
  logTime
};
