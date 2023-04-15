/**
 * A Lambda function that logs the payload received from a CloudWatch scheduled event.
 */
const dynamodb = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb.DocumentClient();
exports.scheduledEventLoggerHandler = async (event, context) => {
  // All log statements are written to CloudWatch by default. For more information, see
  // https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-logging.html
  console.log(JSON.stringify(event));
  // get all data in dymamo db and save to s3

  const tableName = process.env.SAMPLE_TABLE;
  const params = { TableName: tableName };
  const { Items } = await docClient.scan(params).promise();
  // save to s3
  const AWS = require("aws-sdk");
  const s3 = new AWS.S3();
  const bucketName = process.env.BUCKET_NAME;
  const keyName = "data.json";
  const paramsS3 = {
    Bucket: bucketName,
    Key: keyName,
    Body: JSON.stringify(Items),
  };
  s3.putObject(params, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(
        "Successfully uploaded data to " + bucketName + "/" + keyName
      );
    }
  });
  return Items;
};
