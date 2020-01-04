const axios = require('axios');
const { JSDOM } = require('jsdom');
const flatten = require('lodash/flatten');

const VOTING_GAUNTLET_URL = 'https://support.fire-emblem-heroes.com/voting_gauntlet/current';

/**
 * List all battles
 */
const listBattles = async () => {
  const res = await axios(VOTING_GAUNTLET_URL, {
    maxRedirects: 0,
    validateStatus: (status) => status === 302,
  });

  const dom = await JSDOM.fromURL(res.headers.location);

  const battleNodes = dom.window.document
    .querySelectorAll('.body-section-tournament')[1]
    .querySelectorAll('.tournaments-battle');

  return Array.from(battleNodes).map((battleNode) =>
    Array.from(battleNode.childNodes).map((node) => {
      const text = (i) =>
        dom.window.document.evaluate(
          `div/div/p[${i}]/text()`,
          node,
          null,
          dom.window.XPathResult.STRING_TYPE,
          null,
        ).stringValue;

      return {
        name: text(1),
        score: parseInt(text(2).replace(/,/g, ''), 10),
        isWeaker: node.className.endsWith('behind'),
      };
    }),
  );
};

const listHeroes = async () => {
  const battles = await listBattles();
  return flatten(battles.map((battle) => [{ name: battle[0].name }, { name: battle[1].name }]));
};

module.exports = { VOTING_GAUNTLET_URL, listBattles, listHeroes };
