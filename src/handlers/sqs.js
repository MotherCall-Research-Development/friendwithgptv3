exports.sqsHandler = async function (event, context) {
  event.Records.forEach((record) => {
    const { body } = record;
    // sub is the user id
    const { sub } = JSON.parse(body);
    console.log(sub);
  });
  return {};
};
