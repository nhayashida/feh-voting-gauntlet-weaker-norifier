const Client = require('@line/bot-sdk').Client;

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};
const client = new Client(config);

/**
 * Push a message to a user
 *
 * @param payload
 */
const pushMessage = async (payload) => {
  const { userId, messages } = payload;
  const results = await client.pushMessage(userId, messages);

  return results;
};

module.exports = { pushMessage };
