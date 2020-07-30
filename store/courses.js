const SET_COURSES = 'SET_COURSES';
const ADD_ASSIGNED_COURSE = 'ADD_ASSIGNED_COURSE';
const REMOVE_FROM_ASSIGNED_COURSE = 'REMOVE_FROM_ASSIGNED_COURSE';
const RESET_ASSIGNED_COURSE = 'RESET_ASSIGNED_COURSE';

export const state = () => ({
  courses: [],
  assignedcourses: []
});

export const getters = {
  assignedcourses: state => state.assignedcourses,

  availableCourses: state => state.courses
    .filter(course => !state.assignedcourses
      .map(ac => ac.id)
      .includes(course.id)
    )
};

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
  },

  [ADD_ASSIGNED_COURSE] (state, { selectedCourse, callback }) {
    const existsInAssignedCourses = state.assignedcourses.find(ac => ac.id === selectedCourse.id);

    if (!existsInAssignedCourses) {
      state.assignedcourses.push(selectedCourse);
      callback();
    }
  },

  [REMOVE_FROM_ASSIGNED_COURSE] (state, payload) {
    state.assignedcourses = state.assignedcourses.filter(ac => ac.id !== payload.id);
  },

  [RESET_ASSIGNED_COURSE] (state) {
    state.assignedcourses = [];
  }
};
