import { MessageAttachment } from '@slack/client';
import { CronJob } from 'cron';
import { listBattles } from '../services/feh';
import { postMessage, listChannels } from '../services/slack';
import logger from '../utils/logger';

const checkGameSituation = async () => {
  const job = new CronJob(process.env.JOB_SCHEDULE || '0 5,35 * * * *', async () => {
    const channelName = process.env.SLACK_CHANNEL_NAME;
    const channels = (await listChannels()).filter(channel => channel.name === channelName);
    if (!channels.length) {
      logger.error(`"${channelName}" channel is not found`);
      return;
    }

    const battles = await listBattles();
    logger.debug(battles);

    for (const battle of battles) {
      const players = [...battle];
      // Post a message if your hero is a weaker
      const hero = players.find(player => player.name === process.env.FEH_HERO_NAME);
      if (hero && hero.isWeaker) {
        const fields = players.map(player => ({
          title: player.name,
          value: player.score.toString(),
          short: true,
        }));
        const attachments: MessageAttachment[] = [{ fields }];
        const result = await postMessage(channels[0].id, '', attachments);
        logger.debug(result);

        break;
      }
    }
  });
  job.start();
};

export default checkGameSituation;
