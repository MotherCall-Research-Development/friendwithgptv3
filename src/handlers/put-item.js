// Create clients and set shared const values outside of the handler

// Create a DocumentClient that represents the query to add an item
const { SQS } = require("aws-sdk");
const dynamodb = require("aws-sdk/clients/dynamodb");
const { v4: uuid } = require("uuid");
const docClient = new dynamodb.DocumentClient();

// Get the DynamoDB table name from environment variables
const tableName = process.env.SAMPLE_TABLE;

/**
 * A simple example includes a HTTP post method to add one item to a DynamoDB table.
 */
exports.putItemHandler = async (event) => {
  const { body, httpMethod, path } = event;
  if (httpMethod !== "POST") {
    throw new Error(
      `postMethod only accepts POST method, you tried: ${httpMethod} method.`
    );
  }
  // use sqs to send message to the queue

  console.log("received:", JSON.stringify(event));
  // Get id and name from the body of the request
  const { question, answer, user } = JSON.parse(body);

  const params = {
    TableName: tableName,
    Item: { question, answer, id: uuid(), user },
  };
  await docClient.put(params).promise();
  // add user to the database

  const response = {
    statusCode: 200,
    body,
  };

  return response;
};
//
