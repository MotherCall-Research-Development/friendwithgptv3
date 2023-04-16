// login call to cognito
const AWS = require("aws-sdk");
const cognitoClient = new AWS.CognitoIdentityServiceProvider();
exports.cognitoHandleLoginHandler = async (event) => {
  const { httpMethod, path } = event;
  if (httpMethod !== "POST") {
    throw new Error(`login only accept POST method, you tried: ${httpMethod}`);
  }
  console.log("received:", JSON.stringify(event));

  const body = JSON.parse(event.body);
  const { username, password } = body;

  const params = {
    AuthFlow: process.env.USER_PASSWORD_AUTH,
    ClientId: process.env.CLIENT_ID,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };

  const result = await cognitoClient
    .initiateAuth(params)
    .promise()
    .catch((err) => {
      console.log(err);
      return err;
    });

  console.log(result);

  const response = {
    statusCode: 200,
    body: JSON.stringify(result),
  };

  console.log(
    `response from: ${path} statusCode: ${response.statusCode} body: ${response.body}`
  );
  return response;
};
