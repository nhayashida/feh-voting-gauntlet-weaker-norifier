export enum ActionType {
  SET_CHANNELS = 'SET_CHANNELS',
}

export type Channel = {
  id: string;
  name: string;
};

export type SlackState = {
  channels: Channel[];
};

type SetChannelsAction = {
  type: typeof ActionType.SET_CHANNELS;
  channels: Channel[];
};

export type SlackActionTypes = SetChannelsAction;
