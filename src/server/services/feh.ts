import { JSDOM } from 'jsdom';
import flatten from 'lodash/flatten';
import rp from 'request-promise';

const VOTING_GAUNTLET_URL = 'https://support.fire-emblem-heroes.com/voting_gauntlet/current';

/**
 * List all battles
 */
export const listBattles = async () => {
  const res = await rp(VOTING_GAUNTLET_URL, {
    followRedirect: false,
    simple: false,
    resolveWithFullResponse: true,
  });

  const dom = await JSDOM.fromURL(res.headers['location']);

  const battleNodes = dom.window.document
    .querySelectorAll('.body-section-tournament')[1]
    .querySelectorAll('.tournaments-battle');

  return Array.from(battleNodes).map(battleNode =>
    Array.from(battleNode.childNodes as NodeListOf<HTMLDivElement>).map(node => {
      const text = (i: number) =>
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

export const listHeroes = async () => {
  const battles = await listBattles();
  return flatten(battles.map(battle => [{ name: battle[0].name }, { name: battle[1].name }]));
};
