import { MessageAttachment } from '@slack/client';
import { CronJob } from 'cron';
import { listBattles } from '../services/feh';
import { getSettings } from '../services/settings';
import { postMessage, listChannels } from '../services/slack';
import logger from '../utils/logger';

const checkSituation = async () => {
  const job = new CronJob(process.env.JOB_SCHEDULE || '0 5 * * * *', async () => {
    const settings = await getSettings();
    if (!(await listChannels()).some(channel => channel.id === settings.channel)) {
      logger.error(`"${settings.channel}" channel is not found`);
      return;
    }

    const battles = await listBattles();
    logger.debug(battles);

    for (const battle of battles) {
      const players = [...battle];
      // Post a message if your hero is a weaker
      const hero = players.find(player => player.name === settings.hero);
      if (hero && hero.isWeaker) {
        const fields = players.map(player => ({
          title: player.name,
          value: player.score.toString(),
          short: true,
        }));
        const attachments: MessageAttachment[] = [{ fields }];
        const result = await postMessage(settings.channel, '', attachments);
        logger.debug(result);

        break;
      }
    }
  });
  job.start();
};

export default checkSituation;
