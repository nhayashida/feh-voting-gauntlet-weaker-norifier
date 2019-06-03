export enum ActionType {
  SET_SETTINGS = 'SET_SETTINGS',
  SHOW_ERROR_MESSAGE = 'SHOW_ERROR_MESSAGE',
  HIDE_ERROR_MESSAGE = 'HIDE_ERROR_MESSAGE',
  START_LOADING = 'START_LOADING',
  END_LOADING = 'END_LOADING',
}

export type Settings = {
  hero: string;
  channel: string;
};

export type AppState = {
  settings: Settings;
  errorMessage: string;
  loading: boolean;
};

type SetSettingsAction = {
  type: typeof ActionType.SET_SETTINGS;
  settings: { type: string; settings: { [key: string]: string } };
};

type ShowErrorMessageAction = {
  type: typeof ActionType.SHOW_ERROR_MESSAGE;
  errorMessage: string;
};

type HideErrorMessageAction = {
  type: typeof ActionType.HIDE_ERROR_MESSAGE;
};

type StartLoadingAction = {
  type: typeof ActionType.START_LOADING;
};

type EndLoadingAction = {
  type: typeof ActionType.END_LOADING;
};

export type AppActionTypes = SetSettingsAction &
  ShowErrorMessageAction &
  HideErrorMessageAction &
  StartLoadingAction &
  EndLoadingAction;
