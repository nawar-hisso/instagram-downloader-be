import mongoose, { connect } from 'mongoose';
import CONSTANTS from '../configs/constants.js';
import MESSAGES from '../configs/messages.js';
import logger from '../utils/logger.js';

mongoose.set('strictQuery', true);

const dbConnect = connect(CONSTANTS.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    logger.info(MESSAGES.CONNECT.SUCCESS);
  })
  .catch(error => {
    logger.error(MESSAGES.CONNECT.ERROR, error);
    process.exit();
  });

export default dbConnect;
