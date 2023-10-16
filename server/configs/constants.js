import * as dotenv from 'dotenv';
dotenv.config();

const PRODUCTION_ENV = 'production';
const DEVELOPMENT_ENV = 'development';
const CURRENT_ENV =
  process.env.CURRENT_ENV === 'development' ? DEVELOPMENT_ENV : PRODUCTION_ENV;

const APPLICATION_NAME = process.env.APPLICATION_NAME || '';

const DB_URI = process.env.DB_URI || '';

const PORT = process.env.PORT || 5000;

const LANGUAGE = process.env.LANGUAGE || 'en-US';

const LOG_FOLDER = process.env.LOG_FOLDER || 'logs';

const INFO_LOG_FILE_NAME = process.env.INFO_LOG_FILE_NAME || 'info-%DATE%.log';

const ERROR_LOG_FILE_NAME =
  process.env.ERROR_LOG_FILE_NAME || 'error-%DATE%.log';

const LOG_FILE_SIZE = process.env.LOG_FILE_SIZE || '10m';

const SERVER_LOGGING_LEVEL = process.env.SERVER_LOGGING_LEVEL || 'debug';

const TOKEN_EXPIRY = process.env.TOKEN_EXPIRY || '2h';

const CONSTANTS = {
  PRODUCTION_ENV,
  DEVELOPMENT_ENV,
  CURRENT_ENV,
  APPLICATION_NAME,
  DB_URI,
  PORT,
  LANGUAGE,
  LOG_FOLDER,
  INFO_LOG_FILE_NAME,
  ERROR_LOG_FILE_NAME,
  LOG_FILE_SIZE,
  SERVER_LOGGING_LEVEL,
  TOKEN_EXPIRY,
};

export default CONSTANTS;
