# Study Planner

A Study Planner to allow students to easily manage their time with regards to studying for exams and completing coursework.

This app is linked to Quodl, any user can share an account between the two, but it will be hosted on a separate server.

The app is written in Javascript, with a React front end and a Node/Hapi server.

We are using DynamoDb to store the assessment data, and user data is coming from the Quodl PostgreSQL database.

If you'd like to develop using a local DynamoDB instance, see [here](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html#DynamoDBLocal.DownloadingAndRunning) for installation instructions.

Once you've installed DynamoDB, create the table by running
```
./create-table.sh
```
from this directory, then use the following environment variables:

```
export DYNAMO_TABLE_NAME=quodl-study-planner
export AWS_REGION=eu-west-2
export DYNAMO_ENDPOINT=http://localhost:8000
export REACT_APP_API_URL=http://localhost:5000
```
