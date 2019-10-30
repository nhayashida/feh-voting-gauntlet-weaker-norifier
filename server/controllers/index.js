import bparser from 'body-parser';
import express from 'express';
import { getSettings, updateSettings } from '../services/settings';
import { listHeroes } from '../services/feh';
import { listChannels } from '../services/slack';
import logger from '../utils/logger';

const app = express();

app.get('/profile', async (req, res, next) => {
  try {
    const settings = getSettings();
    const heroes = await listHeroes();
    const channels = await listChannels();

    res.json({ settings, heroes, channels });
  } catch (err) {
    logger.error(err);
    next(err);
  }
});

app.post('/settings', bparser.json(), (req, res, next) => {
  try {
    res.json(updateSettings(req.body));
  } catch (err) {
    logger.error(err);
    next(err);
  }
});

module.exports = {
  path: '/api',
  handler: app,
};
