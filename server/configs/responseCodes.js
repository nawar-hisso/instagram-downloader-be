// Setting all type of response codes we will use
const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const METHOD_NOT_ALLOWED = 405;
const DUPLICATE_RECORD = 409;
const UNPROCESSABLE_ENTITY = 422;
const TOO_MANY_REQUESTS = 429;
const INTERNAL_SERVER_ERROR = 500;
const MONGODB_DUPLICATE_KEY_ERROR = 11000;

// Export all response codes in one constant, so we can import this one and use all codes through RESPONSE_CODES name
const RESPONSE_CODES = {
  OK,
  CREATED,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  METHOD_NOT_ALLOWED,
  DUPLICATE_RECORD,
  UNPROCESSABLE_ENTITY,
  TOO_MANY_REQUESTS,
  INTERNAL_SERVER_ERROR,
  MONGODB_DUPLICATE_KEY_ERROR,
};

export default RESPONSE_CODES;
