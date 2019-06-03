import { combineReducers } from 'redux';
import { ActionType, Channel, SlackActionTypes, SlackState } from './types';

const initState: SlackState = {
  channels: [] as Channel[],
};

const channels = (state = initState.channels, action: SlackActionTypes) => {
  switch (action.type) {
    case ActionType.SET_CHANNELS:
      return action.channels;
  }

  return state;
};

export const slackReducer = combineReducers({
  channels,
});
