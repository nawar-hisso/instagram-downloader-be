import CONSTANTS from './constants.js';

const CONNECT = {
  SUCCESS: 'Successfully connected to the database',
  HOME: 'NodeJs APIs Server',
  ERROR: 'Error! Could not connect to the database',
  PENDING: 'Connecting...',
  LISTENING: `App listening on port ${CONSTANTS.PORT}`,
};

const INFOS = {
  SUCCESS: 'Success',
};

const ERRORS = {
  SERVER: 'Internal serve error',
};

const MESSAGES = {
  CONNECT,
  INFOS,
  ERRORS,
};

export default MESSAGES;
