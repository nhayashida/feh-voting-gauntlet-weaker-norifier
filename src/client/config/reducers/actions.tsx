import { Dispatch } from 'redux';
import { setSettings, showErrorMessage, startLoading, endLoading } from '../reducers/app/actions';
import { setHeroes } from '../reducers/feh/actions';
import { setChannels } from '../reducers/slack/actions';
import profile from '../services/profile';
import settings from '../services/settings';

export const updateSettings = (props: { [key: string]: string }) => async (dispatch: Dispatch) => {
  try {
    await settings.update(props);
    dispatch(setSettings(props));
  } catch (err) {
    dispatch(showErrorMessage(err.message));
  }
};

export const initialize = () => async (dispatch: Dispatch) => {
  try {
    dispatch(startLoading());

    const { settings, heroes, channels } = await profile.load();
    dispatch(setSettings(settings));
    dispatch(setHeroes(heroes));
    dispatch(setChannels(channels));
  } catch (err) {
    dispatch(showErrorMessage(err.message));
  } finally {
    dispatch(endLoading());
  }
};
