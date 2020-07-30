const ADD_CREATED_CYCLE = 'ADD_CREATED_CYCLE';
const REMOVE_CREATED_CYCLE = 'REMOVE_CREATED_CYCLE';
const ADD_COURSE_TO_CYCLE = 'ADD_COURSE_TO_CYCLE';
const REMOVE_COURSE_FROM_CYCLE = 'REMOVE_COURSE_FROM_CYCLE';

export const state = () => ({
  createdCycles: []
});

export const getters = {
  existsCoursesInAllCycles: (state) => {
    for (const createdCycle of state.createdCycles) {
      if (createdCycle.courses.length === 0) {
        return false;
      }
    }
    return true;
  },

  existsCycles: state => !!state.createdCycles.length
};

export const mutations = {
  [ADD_CREATED_CYCLE] (state, { cycleNumber, courses }) {
    state.createdCycles.push({ cycleNumber, courses });
  },

  [REMOVE_CREATED_CYCLE] (state, payload) {
    state.createdCycles = state.createdCycles.filter(cc => cc.cycleNumber !== payload);
  },

  [ADD_COURSE_TO_CYCLE] (state, { cycleNumber, course }) {
    const indexCreatedCycleToAdd = state.createdCycles.findIndex(cc => cc.cycleNumber === cycleNumber);

    state.createdCycles[indexCreatedCycleToAdd].courses.push(course);
  },

  [REMOVE_COURSE_FROM_CYCLE] (state, { cycleNumber, course }) {
    const indexCreatedCycleToAdd = state.createdCycles.findIndex(cc => cc.cycleNumber === cycleNumber);

    state.createdCycles[indexCreatedCycleToAdd].courses =
      state.createdCycles[indexCreatedCycleToAdd].courses
        .filter(cc => cc.id !== course.id);
  }
};
