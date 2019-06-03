import { WebClient, WebAPICallResult, MessageAttachment } from '@slack/client';
import pick from 'lodash/pick';

const client = new WebClient(process.env.SLACK_ACCESS_TOKEN);

/**
 * Post a message
 *
 * @param channel
 * @param text
 * @param attachments
 */
export const postMessage = async (
  channel: string,
  text: string,
  attachments?: MessageAttachment[],
): Promise<WebAPICallResult> => {
  const results = await client.chat.postMessage({
    channel,
    text,
    attachments,
  });
  return results;
};

/**
 * List all public channels
 */
export const listChannels = async () => {
  try {
    const result = await client.conversations.list({ exclude_archived: true });
    return (result.channels as { id: string; name: string }[])
      .map(channel => pick(channel, ['id', 'name']))
      .sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
  } catch (err) {
    throw err;
  }
};
