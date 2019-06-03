import { ActionType } from './types';

export const setSettings = (settings: { [key: string]: string }) => ({
  settings,
  type: ActionType.SET_SETTINGS,
});

export const showErrorMessage = (errorMessage: string) => ({
  errorMessage,
  type: ActionType.SHOW_ERROR_MESSAGE,
});

export const hideErrorMessage = () => ({
  type: ActionType.HIDE_ERROR_MESSAGE,
});

export const startLoading = () => ({
  type: ActionType.START_LOADING,
});

export const endLoading = () => ({
  type: ActionType.END_LOADING,
});
