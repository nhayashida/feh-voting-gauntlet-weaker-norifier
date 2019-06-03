import { NextFunction, Request, Response } from 'express';
import { updateSettings } from '../services/settings';
import logger from '../utils/logger';

/**
 * Update user settings
 *
 * @param req
 * @param res
 */
const update = async (req: Request, res: Response, next: NextFunction) => {
  logger.debug(req.body);

  try {
    res.send(updateSettings(req.body));
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

export default { update };
