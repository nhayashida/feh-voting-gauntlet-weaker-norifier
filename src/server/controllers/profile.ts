import { NextFunction, Request, Response } from 'express';
import { getSettings } from '../services/settings';
import { listHeroes } from '../services/feh';
import { listChannels } from '../services/slack';
import logger from '../utils/logger';

/**
 * Retrieve application and user profiles
 *
 * @param req
 * @param res
 * @param next
 */
const load = async (req: Request, res: Response, next: NextFunction) => {
  try {
    try {
      const settings = getSettings();
      const heroes = await listHeroes();
      const channels = await listChannels();

      res.send({ settings, heroes, channels });
    } catch (err) {
      throw err;
    }
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

export default { load };
