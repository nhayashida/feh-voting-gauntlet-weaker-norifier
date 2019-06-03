import { ActionType, Channel } from './types';

export const setChannels = (channels: Channel[]) => ({
  channels,
  type: ActionType.SET_CHANNELS,
});
