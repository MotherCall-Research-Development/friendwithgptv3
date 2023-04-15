// Create clients outside of the handler

// Create a client to read objects from S3
const AWS = require("aws-sdk");
const { v4: uuid } = require("uuid");
const parseMultipart = require("parse-multipart");
const s3 = new AWS.S3();
AWS.config.update({ region: "ap-southeast-1" });
exports.uploadFileToS3Handler = async (event, context) => {
  const bucketName =
    "aws-ap-southeast-1-162229977653-friendwithgptv3-simpleappbucket";
  // upload file to s3 , in body  method post
  try {
    // const { filename, data } = extractFile(event);
    const data = Buffer.from(event.body, "base64");
    await s3
      .putObject({
        Bucket: bucketName,
        Key: uuid(),
        ACL: "public-read",
        Body: data,
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        link: `https://${BUCKET}.s3.amazonaws.com/${filename}`,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.stack }),
    };
  }
};

function extractFile(event) {
  console.log("event.headers", event.headers);
  const boundary = parseMultipart.getBoundary(event.headers["content-type"]);
  const parts = parseMultipart.Parse(
    Buffer.from(event.body, "base64"),
    boundary
  );
  const [{ filename, data }] = parts;

  return {
    filename,
    data,
  };
}
