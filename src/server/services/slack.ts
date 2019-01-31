import { WebClient, WebAPICallResult, MessageAttachment } from '@slack/client';
import { pick } from 'lodash';

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
export const listChannels = async (): Promise<Slack.Channel[]> => {
  const results = await client.conversations.list({ exclude_archived: true });

  const channels: Slack.Channel[] = [];
  if (results.ok) {
    channels.push(...(results as any).channels.map(channel => pick(channel, ['id', 'name'])));
  }
  return channels.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
};
