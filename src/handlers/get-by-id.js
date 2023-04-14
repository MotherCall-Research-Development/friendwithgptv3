// Create clients and set shared const values outside of the handler

// Create a DocumentClient that represents the query to get an item
const dynamodb = require('aws-sdk/clients/dynamodb');

const docClient = new dynamodb.DocumentClient();

// Get the DynamoDB table name from environment variables
const tableName = process.env.SAMPLE_TABLE;

/**
 * A simple example includes a HTTP get method to get one item by id from a DynamoDB table.
 */
exports.getByIdHandler = async (event) => {
    const { httpMethod, path, pathParameters } = event;
    if (httpMethod !== 'GET') {
        throw new Error(`getMethod only accept GET method, you tried: ${httpMethod}`);
    }
   
    console.log('received:', JSON.stringify(event));


    const { id } = pathParameters;

    
    const params = {
        TableName: tableName,
        Key: { id },
    };
    const { Item } = await docClient.get(params).promise();

    const response = {
        statusCode: 200,
        body: JSON.stringify(Item),
    };

    console.log(`response from: ${path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
};
