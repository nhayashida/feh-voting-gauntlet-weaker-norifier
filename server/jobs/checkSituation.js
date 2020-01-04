const { CronJob } = require('cron');
const { VOTING_GAUNTLET_URL, listBattles } = require('../services/feh');
const { pushMessage } = require('../services/line');
const { getSettings } = require('../services/settings');
const logger = require('../utils/logger');

const checkSituation = () => {
  const job = new CronJob(process.env.JOB_SCHEDULE || '0 5 * * * *', async () => {
    const { userId, hero } = getSettings();

    if (!userId) {
      logger.error('Unauthorized');
      return;
    }

    const battles = await listBattles();
    for (const battle of battles) {
      const players = [...battle];
      // Post a message if your hero is a weaker
      const found = players.find((player) => player.name === hero);
      if (found && found.isWeaker) {
        const messages = [
          {
            type: 'text',
            text: `${hero} is a weaker\n${VOTING_GAUNTLET_URL}`,
          },
        ];
        const results = await pushMessage({ userId, messages });
        logger.debug(results);

        break;
      }
    }
  });
  job.start();
};

module.exports = checkSituation;
