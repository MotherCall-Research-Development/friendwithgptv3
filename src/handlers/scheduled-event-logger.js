/**
 * A Lambda function that logs the payload received from a CloudWatch scheduled event.
 */

exports.scheduledEventLoggerHandler = async (event, context) => {
  console.log(JSON.stringify(event));
};
