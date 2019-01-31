import { applyMiddleware, combineReducers, createStore as reduxCreateStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import actionTypes from '../actions/actionTypes';

const initialState = {
  heroes: [],
  channels: [] as Slack.Channel[],
  settings: {} as UserSettings,
  loading: true,
  errorMessage: '',
};
Object.freeze(initialState);

const heroes = (
  heroes: string[] = initialState.heroes,
  action: { type: number; heroes: string[] },
) => {
  switch (action.type) {
    case actionTypes.SET_HEROES:
      return action.heroes;
  }

  return heroes;
};

const channels = (
  channels: Slack.Channel[] = initialState.channels,
  action: { type: number; channels: Slack.Channel[] },
) => {
  switch (action.type) {
    case actionTypes.SET_CHANNELS:
      return action.channels;
  }

  return channels;
};

const settings = (
  settings: UserSettings = initialState.settings,
  action: { type: number; props: { [key: string]: string } },
) => {
  switch (action.type) {
    case actionTypes.SET_SETTINGS:
      return Object.assign({}, settings, action.props);
  }

  return settings;
};

const loading = (loading: boolean = initialState.loading, action: { type: number }): boolean => {
  switch (action.type) {
    case actionTypes.START_LOADING:
      return true;
    case actionTypes.STOP_LOADING:
      return false;
  }

  return loading;
};

const errorMessage = (
  errorMessage: string = initialState.errorMessage,
  action: { type: number; errorMessage: string },
): string => {
  switch (action.type) {
    case actionTypes.SHOW_ERROR_MESSAGE:
      return action.errorMessage;
    case actionTypes.HIDE_ERROR_MESSAGE:
      return '';
  }

  return errorMessage;
};

export const createStore = () => {
  const reducers = combineReducers({
    heroes,
    channels,
    settings,
    loading,
    errorMessage,
  });
  return reduxCreateStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
};
