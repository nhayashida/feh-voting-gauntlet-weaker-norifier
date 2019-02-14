import { Dispatch } from 'redux';
import actionTypes from './actionTypes';
import profile from '../services/profile';

const actions = {
  showErrorMessage: (errorMessage: string) => ({
    errorMessage,
    type: actionTypes.SHOW_ERROR_MESSAGE,
  }),

  hideErrorMessage: () => ({
    type: actionTypes.HIDE_ERROR_MESSAGE,
  }),

  startLoading: () => ({
    type: actionTypes.START_LOADING,
  }),

  endLoading: () => ({
    type: actionTypes.END_LOADING,
  }),

  setHeroes: (heroes: string[]) => ({
    heroes,
    type: actionTypes.SET_HEROES,
  }),

  setChannels: (channels: Slack.Channel[]) => ({
    channels,
    type: actionTypes.SET_CHANNELS,
  }),

  setSettings: (props: { [key: string]: string }) => ({
    props,
    type: actionTypes.SET_SETTINGS,
  }),

  updateSettings: (props: { [key: string]: string }) => async (dispatch: Dispatch) => {
    try {
      await profile.update(props);
      dispatch(actions.setSettings(props));
    } catch (err) {
      dispatch(actions.showErrorMessage(err.message));
    }
  },

  initialize: () => async (dispatch: Dispatch) => {
    try {
      dispatch(actions.startLoading());

      const { heroes, channels, settings } = await profile.load();
      dispatch(actions.setHeroes(heroes));
      dispatch(actions.setChannels(channels));
      dispatch(actions.setSettings(settings));
    } catch (err) {
      dispatch(actions.showErrorMessage(err.message));
    } finally {
      dispatch(actions.endLoading());
    }
  },
};

export default actions;
