import axios from 'axios';

export const state = () => ({
  error: '',
  loading: false,
  settings: {},
  heroes: [],
});

export const mutations = {
  UPDATE_ERROR(state, error) {
    state.error = error;
  },
  UPDATE_LOADING(state, loading) {
    state.loading = loading;
  },
  UPDATE_PROFILE(state, { settings, heroes }) {
    state.settings = settings;
    state.heroes = heroes;
  },
  UPDATE_SETTINGS(state, payload) {
    state.settings = payload;
  },
};

export const actions = {
  setError({ commit }, error) {
    commit('UPDATE_ERROR', error);
  },

  async fetchProfile({ commit }) {
    try {
      commit('UPDATE_ERROR', '');
      commit('UPDATE_LOADING', true);

      const res = await axios.get('/api/profile');
      commit('UPDATE_PROFILE', res.data);
    } catch (err) {
      commit('UPDATE_ERROR', err.message);
      console.debug(err);
    } finally {
      commit('UPDATE_LOADING', false);
    }
  },

  async setSettings({ commit, state }, prop) {
    try {
      commit('UPDATE_ERROR', '');

      const res = await axios.post('/api/settings', { ...state.settings, ...prop });
      commit('UPDATE_SETTINGS', res.data);
    } catch (err) {
      commit('UPDATE_ERROR', err.message);
      console.debug(err);
    }
  },
};
