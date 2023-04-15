// Create clients outside of the handler

// Create a client to read objects from S3
const AWS = require("aws-sdk");

const s3 = new AWS.S3();

exports.uploadFileToS3Handler = async (event, context) => {
  const bucketName = event.Records[0].s3.bucket.name;
  // upload file to s3 , in body  method post
  console.log("bucketName", bucketName);
  const fileData = Buffer.from(event.body, "base64");
  const fileName = event.pathParameters.filename;
  const s3Params = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileData,
  };
  await s3.putObject(s3Params).promise();
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "File uploaded successfully" }),
  };
};
