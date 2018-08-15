const AWS = require('aws-sdk');
const ep = new AWS.Endpoint(process.env.DYNAMO_ENDPOINT);
const dynamoDB = new AWS.DynamoDB({region: 'eu-west-2', endpoint: ep});
const moment = require('moment');

async function add(request, h) {
  const payload = typeof request.payload === "string"
    ? JSON.parse(request.payload)
    : request.payload;

  const {user_id, name, priority, date, type} = payload;

  if (!user_id || !name || !priority || !date || !type) {
    return new Error("missing required params");
  }

  const params = {
    'UserId': { S: user_id },
    'Name': { S: name },
    'Priority': { N: priority },
    'DueDate': { S: date },
    'Type': { S: type },
    'Weeks': { M: {} }
  };

  params.Weeks.M[getCurrentWeek()] = {
    M: { 'Target': { N: `${6 * 60}`}, 'ElapsedTime': { N: '0' } } // TODO: Use algorithm to determine target
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
  const params = {
    ExpressionAttributeValues: {
      ":v1": {
       S: "TEST" // TODO: replace with user id
      }
    },
    KeyConditionExpression: "UserId = :v1",
    TableName: process.env.DYNAMO_TABLE_NAME
  };

 return await dynamoDB.query(params).promise()
 .then(res => {
   return {ok: true, assessments: res.Items.map(e => {
     console.log(e);
     return {
       name: e.Name.S,
       type: e.Type.S
     }
   })};
 })
 .catch(err => {
   console.log(err);
   return err
 });
}

async function logTime(request, h) {
  const payload = typeof request.payload === "string"
    ? JSON.parse(request.payload)
    : request.payload;

  const {user_id, name, elapsed_time} = payload;

  const params = {
    Key: {
      "Name": { S: name },
      "UserId": { S: user_id } // TODO: replace with user id
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

/*
Returns the date of the Monday of the current week
*/
function getCurrentWeek() {
  const currentWeek = moment().startOf('isoweek');

  return `${currentWeek.year()}-${currentWeek.month() + 1}-${currentWeek.date()}`
}

module.exports = {
  add,
  list,
  logTime
};
