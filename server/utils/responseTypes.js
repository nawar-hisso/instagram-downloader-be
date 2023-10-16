import RESPONSE_CODES from '../configs/responseCodes.js';
import MESSAGES from '../configs/messages.js';

//Will be used to return success data to clients through APIs
const success = (
  code = RESPONSE_CODES.OK,
  message = MESSAGES.EMPTY,
  data = [],
) => {
  return {
    code,
    message,
    data,
    error: false,
    success: true,
  };
};

// Will be used to return unauthorized status to clients through APIs
const unauthorized = (
  code = RESPONSE_CODES.UNAUTHORIZED,
  message = MESSAGES.EMPTY,
  data = [],
) => {
  return {
    code,
    message,
    data,
    error: true,
    success: false,
  };
};

// Will be used to return error data to clients through APIs
const error = (
  code = RESPONSE_CODES.INTERNAL_SERVER_ERROR,
  message = MESSAGES.EMPTY,
  data = {},
) => {
  return {
    code,
    message,
    data,
    error: true,
    success: false,
  };
};

// Export the two methods in one object so we can call them through responseType name
const responseType = { success, error, unauthorized };

export default responseType;
