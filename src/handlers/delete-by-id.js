const dynamodb = require("aws-sdk/clients/dynamodb");

const docClient = new dynamodb.DocumentClient();

const tableName = process.env.SAMPLE_TABLE;

exports.deleteByIdHandler = async (event) => {
  const { body, httpMethod, pathParameters } = event;
  if (httpMethod !== "DELETE") {
    throw new Error(
      `DeleteMethod only accepts POST method, you tried: ${httpMethod} method.`
    );
  }

  const { id } = pathParameters;

  const params = {
    TableName: tableName,
    Item: { id },
  };

  await docClient.delete(params).promise();
  const response = {
    statusCode: 200,
    body,
  };

  return response;
};
//
