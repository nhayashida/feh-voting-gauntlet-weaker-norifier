import { Settings } from '../reducers/app/types';
import { Hero } from '../reducers/feh/types';
import { Channel } from '../reducers/slack/types';

/**
 * Retrieve application and user settings
 */
const load = async (): Promise<{ settings: Settings; heroes: Hero[]; channels: Channel[] }> => {
  const res = await fetch('/profile');

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error.message);
  }
  return data;
};

export default { load };
