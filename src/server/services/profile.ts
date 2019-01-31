import { listHeroes } from '../services/feh';
import { listChannels } from '../services/slack';

// TODO: Persist
let settings: UserSettings = { hero: '', channel: '' };

/**
 * Retrieve application profile
 */
const load = async () => {
  try {
    const heroes = await listHeroes();
    const channels = await listChannels();
    return { heroes, channels, settings };
  } catch (err) {
    throw err;
  }
};

/**
 * Get user settings
 *
 */
const getSettings = async () => settings;

/**
 * Update user settings
 *
 * @param props
 */
const updateSettings = async (props: UserSettings) => {
  settings = Object.assign(settings, props);
  return settings;
};

export default { load, getSettings, updateSettings };
