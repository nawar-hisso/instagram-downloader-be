import mongoose from 'mongoose';
import RESPONSE_CODES from '../configs/responseCodes.js';
import logger from './logger.js';
import MESSAGES from '../configs/messages.js';

const ObjectId = mongoose.Types.ObjectId;

/**
 * Function to get the type of the object
 * @param {*} element
 * @returns type of the object
 */
const getType = element => {
  return Object.prototype.toString.call(element);
};

/**
 * Function to check if the object is empty based on the type
 * @param {*} element
 * @returns true if the object is empty and false if not
 */
const isEmpty = element => {
  return (
    typeof element === 'undefined' ||
    // string
    (typeof element === 'string' && element.trim().length === 0) ||
    // null
    getType(element) === '[object Null]' ||
    getType(element) === null ||
    // Empty object
    (getType(element) === '[object Object]' && !Object.keys(element).length) ||
    // Empty array
    (getType(element) === '[object Array]' && !element.length)
  );
};

/**
 * Function to check if the object is not empty based on the negation of isEmpty
 * @param {*} element
 * @returns true if the object is not empty and false if empty
 */
const isNotEmpty = element => {
  return !isEmpty(element);
};

/**
 * Function to check if element is an Array
 * @param {*} element
 * @returns true if element is an array and false if not
 */
const isArray = element => {
  return !!(isNotEmpty(element) && getType(element) === '[object Array]');
};

/**
 * Function to check is data is upserted.
 * @param {*} data
 * @returns
 */
const isUpdated = data => {
  return data.ok === 1;
};

/**
 * Function to check if element is an Object
 * @param {*} element
 * @returns true if element is an object and false if not
 */

const isObject = element => {
  return !!(isNotEmpty(element) && getType(element) === '[object Object]');
};

/**
 * Function to check is all elements in the array are of 'string' datatype.
 * Returns true if all elements are 'string', otherwise false.
 */
const isArrayOfStrings = array => {
  for (const item of array) {
    if (!getType(item) === '[object String]') {
      return false;
    }
  }
  return isArray(array);
};

/**
 * Function to log Errors based on typeof error
 * @param {*} err
 * @param {*} defaultMessage
 * @returns new error object
 */
const logErrors = (err, defaultMessage) => {
  // STEP 1: Build default error object.
  const error = {
    status: RESPONSE_CODES.INTERNAL_SERVER_ERROR,
    message: defaultMessage || MESSAGES.UNEXPECTED_ERROR,
  };

  // error.stackTrace;
  if (typeof err === 'string') {
    /**
     * if 'err' variable is custom string message,
     * then override the default message with 'err'.
     */
    error.status = RESPONSE_CODES.BAD_REQUEST;
    error.message = err;
    logger.error(err);
  } else if (getType(err) === '[object Error]') {
    /**
     * if 'err' variable is Javascript error object,
     * then use its default message and stack properties.
     */
    err.message ? logger.error(err.message) : false;
    err.stack ? logger.error(err.stack) : false;
  } else if (getType(err) === '[object Object]' && !isMongooseError(err)) {
    /**
     * if 'err' variable is custom error object,
     * then use its message and status properties if present.
     */
    error.status = err.status || error.status;
    error.message = err.message || error.message;
    error.data = err.data || undefined;
    logger.error(error.message);
  } else {
    // Log default message
    logger.error(error.message);
    // Log raw error
    logger.error(err);
  }

  if (isNotEmpty(err) && isNotEmpty(err.errors)) {
    // errors by express-validators
    error.errors = err.errors;
  }

  return error;
};

/**
 * Function to check whether emailId is valid
 * @param {*} emailId
 * @returns true if emailId is valid
 */

const isValidEmail = emailId => {
  const emailRegex = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,}$/i;
  return emailRegex.test(emailId);
};

/**
 * Function to check if input string is signed/unsigned integer.
 * Example:
 * Input "12345" returns true.
 * Input "+12345" returns true.
 * Input "-12345" returns true.
 * Input "12E45" returns false.
 */
const isValidInteger = numberString => {
  // if not empty and number-string contains only digits
  const digitsRegex = /^[+-]?[0-9]+$/;
  return digitsRegex.test(numberString);
};

/**
 * Function to check if input string is signed/unsigned float.
 * Example:
 * Input "12345" returns true.
 * Input "+12345" returns true.
 * Input "-12345" returns true.
 * Input "12345.123" returns true.
 * Input "+12345.123" returns true.
 * Input "-12345.123" returns true.
 * Input "12E45" returns false.
 */
const isValidFloat = numberString => {
  // if not empty and number-string contains only digits
  const floatRegex = /^[-+]?[0-9]*(\.[0-9]+)?$/;
  return floatRegex.test(numberString);
};

/**
 * Function to check if name is valid or not
 * @param {*} string
 * @returns true if name is valid else false
 */
const isValidName = string => {
  const alphaRegex = /^[a-zA-Z)]+$/;
  return alphaRegex.test(string);
};

/**
 * Function to check if ObjectId is valid or not
 * @param {*} objectId
 * @returns true if ObjectId is valid else false
 */
const isValidObjectId = objectId => {
  return isNotEmpty(objectId) && ObjectId.isValid(objectId.toString());
};

/**
 * Function to return integer if its valid else return 0
 * @param {*} inputNumber
 * @param {*} defaultNumber
 * @returns integer if its valid else return 0
 */
const getValidInteger = (inputNumber, defaultNumber) => {
  if (!isValidInteger(defaultNumber)) {
    defaultNumber = 0;
  }
  return isValidInteger(inputNumber)
    ? parseInt(inputNumber)
    : parseInt(defaultNumber);
};

/**
 * Function to return float if its valid else return 0
 * @param {*} inputNumber
 * @param {*} defaultNumber
 * @returns float if its valid else return 0
 */
const getValidFloat = (inputNumber, defaultNumber) => {
  if (!isValidFloat(defaultNumber)) {
    defaultNumber = 0;
  }
  return isValidFloat(inputNumber)
    ? parseFloat(inputNumber)
    : parseFloat(defaultNumber);
};

/**
 * Function to return input if its valid Boolean else return false
 * @param {*} input
 * @param {*} defaultBoolean
 * @returns true if input is valid else false
 */
const getValidBoolean = (input, defaultBoolean) => {
  if (getType(input) === '[object Boolean]') {
    return input;
  } else if (!isEmpty(input) && input.toString().toLowerCase() === 'true') {
    return true;
  } else return !isEmpty(defaultBoolean) ? defaultBoolean : false;
};

/**
 * Convert an array of valid MongoDB-ObjectId-string to MongoDB ObjectId
 */
const getValidObjectIds = objectIds => {
  const validObjectIds = [];
  for (const item of objectIds) {
    validObjectIds.push(getValidObjectId(item));
  }
  return validObjectIds;
};

/**
 * Convert valid MongoDB-ObjectId-string to MongoDB ObjectId
 */
const getValidObjectId = objectId => {
  if (!isEmpty(objectId) && ObjectId.isValid(objectId.toString())) {
    return new ObjectId(objectId.toString());
  } else {
    logErrors(new Error(MESSAGES.MONGO_DB_INVALID_ID + objectId));
    throw MESSAGES.MONGO_DB_INVALID_ID;
  }
};

/**
 * Function to return session Id from difference of id and ctime
 * @param {*} id
 * @param {*} ctime
 * @returns Session Id if valid else return error
 */
const getSessionId = (id, ctime) => {
  if (!isEmpty(id) && ObjectId.isValid(id.toString())) {
    return id.toString() + ctime.toString();
  } else {
    logErrors(new Error(MESSAGES.INVALID_SESSION_ID + id));
    throw MESSAGES.INVALID_SESSION_ID;
  }
};

const isMongooseError = err => err instanceof mongoose.Error;

const sleep = milliseconds =>
  new Promise(resolve => setTimeout(resolve, milliseconds));

/**
 * Function to get the current date in YYYY-MM-DD HH-MM format
 * @returns
 */
const getDateString = () => {
  return new Date().toLocaleString('sv-SE').replace(/[\s:]/g, '-');
};

/**
 * Function compare date
 * If date1 > date2 return true or false
 * @returns boolean
 */
const compareDate = (date1, date2) => {
  const dateObj1 = new Date(date1);
  const dateObj2 = new Date(date2);
  return dateObj1 > dateObj2;
};

/**
 * Function to check if number is negative or not
 * @param {*} value
 * @returns true if number is negative else false
 */
const checkNegativeNumber = value => {
  const negativeValue = value;
  return negativeValue > 0 || negativeValue === 0;
};

/**
 * Function to return the string with first letter in capital
 * @param {*} str
 * @returns string with first letter in capital
 */
const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Check if the word is a valid string
 * @param {string} word
 * @returns {boolean}
 */
const isValidString = word => {
  return isNotEmpty(word) && typeof word === 'string';
};

/**
 * Check if the password is valid
 * @param {Object} password
 * @returns {boolean}
 */
const isValidPassword = password => {
  return password.length >= 8;
};

/**
 * Returns information message to log at the beginning of any function
 * @param {string} folderName
 * @param {string} fileName
 * @param {string} functionName
 * @param request
 * @returns {string}
 */
const informationLogMessage = (
  folderName = '',
  fileName = '',
  functionName = '',
  request = {},
) => {
  return `ℹ️  ${folderName}/${fileName} - Function Name: ${functionName} - ${requestToLog(
    request,
  )}`.slice(0, -3);
};

/**
 * Returns information message to log at the beginning of any function
 * @param errorType
 * @param {string} folderName
 * @param {string} fileName
 * @param {string} functionName
 * @param request
 * @returns {string}
 */
const errorLogMessage = (
  errorType = '',
  folderName = '',
  fileName = '',
  functionName = '',
  request = {},
) => {
  return `🚨 ${errorType}: ${folderName}/${fileName} - Function Name: ${functionName} - ${requestToLog(
    request,
  )}`.slice(0, -3);
};

/**
 * Returns the body & params & query objects of request
 * Get the request and check for the three parts: (params & body & query)
 * Form them in a new object
 * @param {Object} request
 * @returns {Object}
 */
const parseRequestObject = (request = {}) => {
  const result = { params: '', body: '', query: '' };

  if (isNotEmpty(request.params)) {
    let paramsString = '';
    Object.entries(request.params).forEach(result => {
      paramsString += `${result[0]} = ${result[1]}, `;
    });
    result.params = paramsString.slice(0, -2);
  }

  if (isNotEmpty(request.body)) {
    let bodyString = '';
    Object.entries(request.body).forEach(result => {
      bodyString += `${result[0]} = ${result[1]}, `;
    });
    result.body = bodyString.slice(0, -2);
  }

  if (isNotEmpty(request.query)) {
    let queryString = '';
    Object.entries(request.query).forEach(result => {
      queryString += `${result[0]} = ${result[1]}, `;
    });
    result.query = queryString.slice(0, -2);
  }

  return result;
};

/**
 * Returns a formed string contains all params/body/query for a request
 * Gets the formed request and turns it into a string
 * @param {Object} request
 * @returns {string}
 */
const requestToLog = (request = {}) => {
  let loggedString = '';

  const { params, body, query } = parseRequestObject(request);

  if (isNotEmpty(params)) {
    loggedString += `Params: [${params}] - `;
  }

  if (isNotEmpty(body)) {
    loggedString += `Body: [${body}] - `;
  }

  if (isNotEmpty(query)) {
    loggedString += `Query: [${query}] - `;
  }

  return loggedString;
};

/**
 * Function to check whether array is empty or not
 * @param {*} element
 * @returns boolean
 */
const isEmptyArray = element => {
  return getType(element) === '[object Array]';
};

/**
 * Function to generate a new password
 * @param {*} element
 * @returns string
 */
const generatePassword = () => {
  var length = 12,
    charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_)(+=-%$#@!^&*',
    retVal = '';
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

const helpers = {
  getType,
  isEmpty,
  isNotEmpty,
  isArray,
  isObject,
  isArrayOfStrings,
  logErrors,
  isValidEmail,
  isValidInteger,
  isValidString,
  isValidFloat,
  isValidName,
  isValidObjectId,
  getValidInteger,
  getValidFloat,
  getValidBoolean,
  getValidObjectIds,
  getValidObjectId,
  getSessionId,
  isMongooseError,
  sleep,
  getDateString,
  compareDate,
  checkNegativeNumber,
  capitalize,
  isValidPassword,
  informationLogMessage,
  errorLogMessage,
  parseRequestObject,
  requestToLog,
  isUpdated,
  isEmptyArray,
  generatePassword,
};

export default helpers;
