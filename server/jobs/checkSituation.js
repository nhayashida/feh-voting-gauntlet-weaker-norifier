const { CronJob } = require('cron');
const { listBattles } = require('../services/feh');
const { getSettings } = require('../services/settings');
const { postMessage, listChannels } = require('../services/slack');
const logger = require('../utils/logger');

const checkSituation = () => {
  const job = new CronJob(process.env.JOB_SCHEDULE || '0 5 * * * *', async () => {
    const settings = getSettings();

    if (!(await listChannels()).some((channel) => channel.id === settings.channel)) {
      logger.error(`"${settings.channel}" is not found`);
      return;
    }

    const battles = await listBattles();
    for (const battle of battles) {
      const players = [...battle];
      // Post a message if your hero is a weaker
      const hero = players.find((player) => player.name === settings.hero);
      if (hero && hero.isWeaker) {
        const fields = players.map((player) => ({
          title: player.name,
          value: player.score.toString(),
          short: true,
        }));
        const attachments = [{ fields }];
        const result = await postMessage(settings.channel, '', attachments);
        logger.debug(result);

        break;
      }
    }
  });
  job.start();
};

module.exports = checkSituation;
