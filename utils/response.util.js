resUtil = (statusCode, responseMsg, failedMsg) => {
  let error = new Error(responseMsg);

  error.statusCode = statusCode;
  error.responseMsg = responseMsg;
  error.failedMsg = failedMsg;

  return error;
};

module.exports = resUtil;
