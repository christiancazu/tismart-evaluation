const SET_COURSES = 'SET_COURSES';

export const state = () => ({
  courses: [],
  assignedcourses: []
});

export const actions = {
  async get ({ commit }) {
    const data = await this.$coursesAPI.get();
    commit(SET_COURSES, data);
    return data;
  }
};

export const mutations = {
  [SET_COURSES] (state, payload) {
    state.courses = payload;
  }
};
