const AWS = require('aws-sdk');
var ep = new AWS.Endpoint(process.env.DYNAMO_ENDPOINT);
const dynamoDB = new AWS.DynamoDB({region: 'eu-west-2', endpoint: ep});

async function add(request, h) {
  const {user_id, name, priority, date, type} = JSON.parse(request.payload);

  let params = {
    'UserId': { S: user_id },
    'Name': { S: name },
    'Priority': { N: priority },
    'DueDate': { S: date },
    'Type': { S: type }
  };

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
  var params = {
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

module.exports = {
  add,
  list
};
