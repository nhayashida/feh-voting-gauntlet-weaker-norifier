import { Request, Response } from 'express';
import profile from '../services/profile';
import logger from '../utils/logger';

/**
 * Retrieve application and user profiles
 *
 * @param req
 * @param res
 */
const load = async (req: Request, res: Response) => {
  try {
    res.send(await profile.load());
  } catch (err) {
    logger.error(err);
    res.status(500).send({ message: err.message });
  }
};

/**
s * Update user settings
 *
 * @param req
 * @param res
 */
const update = async (req: Request, res: Response) => {
  logger.debug(req.body);

  try {
    res.send(await profile.updateSettings(req.body));
  } catch (err) {
    logger.error(err);
    res.status(500).send({ message: err.message });
  }
};

export default { load, update };
