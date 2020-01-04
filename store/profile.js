import axios from 'axios';

export const state = () => ({
  settings: {},
  heroes: [],
});

export const mutations = {
  UPDATE_PROFILE(state, { settings, heroes }) {
    state.settings = settings;
    state.heroes = heroes;
  },
  UPDATE_SETTINGS(state, payload) {
    state.settings = payload;
  },
};

export const actions = {
  async fetchProfile({ commit }) {
    try {
      const res = await axios.get('/api/profile');
      commit('UPDATE_PROFILE', res.data);
    } catch (err) {
      console.debug(err);
    }
  },

  async setSettings({ commit, state }, prop) {
    try {
      const res = await axios.post('/api/settings', { ...state.settings, ...prop });
      commit('UPDATE_SETTINGS', res.data);
    } catch (err) {
      console.debug(err);
    }
  },
};
