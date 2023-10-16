import moment from 'moment-timezone';
import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';
import CONSTANTS from '../configs/constants.js';

const { combine, timestamp, label, printf } = format;

const logFolder = CONSTANTS.LOG_FOLDER
  ? CONSTANTS.LOG_FOLDER
  : CONSTANTS.LOG_FOLDER;
const infoLogFilePath = path.join(logFolder, CONSTANTS.INFO_LOG_FILE_NAME);
const errorLogFilePath = path.join(logFolder, CONSTANTS.ERROR_LOG_FILE_NAME);

/**
 * Info level log file
 */
const transportsInfoDailyRotateFile = new transports.DailyRotateFile({
  filename: infoLogFilePath,
  maxSize: CONSTANTS.LOG_FILE_SIZE,
  maxFiles: 1,
  level: 'info',
});
const infoLogFile = transportsInfoDailyRotateFile;

/*
 * Error level log file
 */
const transportsErrorDailyRotateFile = new transports.DailyRotateFile({
  filename: errorLogFilePath,
  maxSize: CONSTANTS.LOG_FILE_SIZE,
  maxFiles: 1,
  level: 'error',
});
const errorLogFile = transportsErrorDailyRotateFile;

/**
 * Returns winston logger instance
 * @returns {Object}
 */
const formatDate = () =>
  new Date().toLocaleString(CONSTANTS.LANGUAGE, {
    timeZone: moment.tz.guess(),
  });

const createLoggerFormat = createLogger({
  format: combine(
    label({ label: CONSTANTS.APPLICATION_NAME }),
    timestamp({
      format: formatDate,
    }),
    printf(
      nfo =>
        `${nfo.timestamp} [${nfo.label}] ${nfo.level}: ${JSON.stringify(
          nfo.message,
        )}`,
    ),
  ),
  level: CONSTANTS.SERVER_LOGGING_LEVEL,
  transports: [infoLogFile, errorLogFile],
  exitOnError: false,
});

const logger = createLoggerFormat;

/**
 * returns the logger instance in Local or Development ENV
 **/
if (CONSTANTS.CURRENT_ENV !== CONSTANTS.PRODUCTION_ENV) {
  const transportsConsole = new transports.Console({
    format: combine(
      label({ label: CONSTANTS.APPLICATION_NAME }),
      timestamp({
        format: formatDate,
      }),
      printf(
        nfo =>
          `${nfo.timestamp} [${nfo.label}] ${nfo.level}: ${JSON.stringify(
            nfo.message,
          )}`,
      ),
    ),
  });
  logger.add(transportsConsole);
}
export default logger;
