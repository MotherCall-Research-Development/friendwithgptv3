// register use cognito to register a new user
// Path: friendwithgptv3/src/handlers/register.js
// Compare this snippet from friendwithgptv3/src/handlers/login.js:
// // login call to cognito
const AWS = require("aws-sdk");
const cognitoClient = new AWS.CognitoIdentityServiceProvider();
exports.cognitoHandleRegisterHandler = async (event) => {
  const { httpMethod, path } = event;
  if (httpMethod !== "POST") {
    throw new Error(
      `register only accept POST method, you tried: ${httpMethod}`
    );
  }

  console.log("received:", JSON.stringify(event));

  const body = JSON.parse(event.body);
  const { username, password, email } = body;

  const params = {
    ClientId: process.env.CLIENT_ID,
    Password: password,
    Username: username,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
    ],
  };

  const result = await cognitoClient
    .signUp(params)
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
