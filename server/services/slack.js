const { WebClient } = require('@slack/client');
const pick = require('lodash/pick');

const client = new WebClient(process.env.SLACK_ACCESS_TOKEN);

/**
 * Post a message
 *
 * @param channel
 * @param text
 * @param attachments
 */
const postMessage = async (channel, text, attachments) => {
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
const listChannels = async () => {
  try {
    const result = await client.conversations.list({ exclude_archived: true });
    return result.channels
      .map((channel) => pick(channel, ['id', 'name']))
      .sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
  } catch (err) {
    throw err;
  }
};

module.exports = { postMessage, listChannels };
