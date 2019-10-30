const fromPairs = require('lodash/fromPairs');

// TODO: Persist
const settingMap = new Map();

/**
 * Get settings
 *
 */
const getSettings = () => fromPairs(Array.from(settingMap.entries()));

/**
 * Update settings
 *
 * @param props
 */
const updateSettings = (props) => {
  Object.keys(props).forEach((key) => {
    settingMap.set(key, props[key]);
  });
  return getSettings();
};

module.exports = { getSettings, updateSettings };
