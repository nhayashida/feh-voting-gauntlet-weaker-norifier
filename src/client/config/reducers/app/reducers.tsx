import { combineReducers } from 'redux';
import { ActionType, AppActionTypes, AppState, Settings } from './types';

const initState: AppState = {
  settings: {
    hero: '',
    channel: '',
  } as Settings,
  errorMessage: '',
  loading: false,
};

const settings = (state = initState.settings, action: AppActionTypes) => {
  switch (action.type) {
    case ActionType.SET_SETTINGS:
      return { ...state, ...action.settings };
  }

  return state;
};

const errorMessage = (state = initState.errorMessage, action: AppActionTypes) => {
  switch (action.type) {
    case ActionType.SHOW_ERROR_MESSAGE:
      return action.errorMessage;
    case ActionType.HIDE_ERROR_MESSAGE:
      return initState.errorMessage;
  }

  return state;
};

const loading = (state = initState.loading, action: AppActionTypes) => {
  switch (action.type) {
    case ActionType.START_LOADING:
      return true;
    case ActionType.END_LOADING:
      return false;
  }

  return state;
};

export const appReducer = combineReducers({
  settings,
  errorMessage,
  loading,
});
