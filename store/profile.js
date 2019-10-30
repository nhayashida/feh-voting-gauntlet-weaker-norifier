import axios from 'axios';

export const state = () => ({
  profile: {
    settings: {},
    heroes: [],
    channels: [],
  },
});

export const getters = {
  settings: (state) => state.profile.settings,
  heroes: (state) => state.profile.heroes,
  channels: (state) => state.profile.channels,
};

export const mutations = {
  UPDATE_PROFILE(state, payload) {
    state.profile = payload;
  },
  UPDATE_SETTINGS(state, payload) {
    state.profile.settings = payload;
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
      const res = await axios.post('/api/settings', { ...state.profile.settings, ...prop });
      commit('UPDATE_SETTINGS', res.data);
    } catch (err) {
      console.debug(err);
    }
  },
};
