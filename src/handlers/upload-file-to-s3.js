// Create clients outside of the handler

// Create a client to read objects from S3
const AWS = require("aws-sdk");
const { v4: uuid } = require("uuid");
const s3 = new AWS.S3();
AWS.config.update({ region: "ap-southeast-1" });
exports.uploadFileToS3Handler = async (event, context) => {
  const bucketName =
    "aws-ap-southeast-1-162229977653-friendwithgptv3-simpleappbucket";
  // upload file to s3 , in body  method post
  const fileData = Buffer.from(event.body.file, "base64");
  const fileName = uuid();

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
