import MESSAGES from '../configs/messages.js';
import RESPONSE_CODES from '../configs/responseCodes.js';
import helpers from '../utils/helpers.js';
import logger from '../utils/logger.js';
import responseType from '../utils/responseTypes.js';

/**
 * home default message
 * @param {Request} req
 * @param {Response} res
 */
export function home(req, res) {
  logger.info(
    helpers.informationLogMessage(
      'controllers',
      'default.controllers.js',
      'home',
      req,
    ),
  );

  return res
    .status(RESPONSE_CODES.OK)
    .json(responseType.success(RESPONSE_CODES.OK, MESSAGES.CONNECT.HOME));
}
