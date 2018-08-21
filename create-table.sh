#!/bin/bash

aws dynamodb create-table --table-name quodl-study-planner --endpoint-url http://localhost:8000 --region eu-west-2 --attribute-definitions AttributeName=UserId,AttributeType=S AttributeName=Name,AttributeType=S --key-schema AttributeName=UserId,KeyType=HASH AttributeName=Name,KeyType=RANGE --provisioned-throughput ReadCapacityUnits=10000,WriteCapacityUnits=10000
