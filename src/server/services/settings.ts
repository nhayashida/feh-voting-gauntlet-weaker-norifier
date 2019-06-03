import fromPairs from 'lodash/fromPairs';

// TODO: Persist
const settingMap = new Map<string, string>();

/**
 * Get settings
 *
 */
export const getSettings = () => fromPairs(Array.from(settingMap.entries()));

/**
 * Update settings
 *
 * @param props
 */
export const updateSettings = (props: { [key: string]: string }) => {
  Object.keys(props).forEach(key => {
    settingMap.set(key, props[key]);
  });
  return getSettings();
};
