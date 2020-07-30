const SET_FACULTIES = 'SET_FACULTIES';

export const state = () => ({
  faculties: []
});

export const actions = {
  async get ({ commit }) {
    const data = await this.$facultiesAPI.get();
    commit(SET_FACULTIES, data);
    return data;
  }
};

export const mutations = {
  [SET_FACULTIES] (state, payload) {
    state.faculties = payload;
  }
};
