<template lang="pug">
el-card(shadow="never", class="cycle")
  section.cycle__header
    p Ciclo {{ number }}
    el-select(
      v-model="courseSelected",
      filterable,
      placeholder="Agregar curso al ciclo",
      @change="handleSelectedCourse(availableCourses.find(ac => ac.id === $event))"
    )
      el-option(
        v-for="course in availableCourses" :key="course.id",
        :value="course.id",
        :label="course.name"
      )
  section.cycle__courses
    el-tag(
      v-for="cycleCourse in cycleCourses" :key="cycleCourse.id",
      type="primary",
      effect="dark",
      size="small",
      class="cycle__courses__tag",
      closable,
      @close="handleRemoveCourse(cycleCourse)"
    ) {{ cycleCourse.name }}

</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from '@vue/composition-api';

export default {
  props: {
    number: {
      type: Number, required: true
    }
  },

  setup (props, { root }) {
    onMounted(() => {
      root.$store.commit('cycles/ADD_CREATED_CYCLE', {
        cycleNumber: props.number,
        courses: []
      });
    });

    onBeforeUnmount(() => {
      root.$store.commit('cycles/REMOVE_CREATED_CYCLE', props.number);
    });

    const cycleCourses = ref([]);
    const courseSelected = ref(null);

    const courses = computed(() => root.$store.state.courses.courses);
    const availableCourses = computed(() => root.$store.getters['courses/availableCourses']);

    function handleRemoveCourse (courseToRemove) {
      root.$store.commit('courses/REMOVE_FROM_ASSIGNED_COURSE', courseToRemove);
      root.$store.commit('cycles/REMOVE_COURSE_FROM_CYCLE', {
        cycleNumber: props.number,
        course: courseToRemove
      });
      cycleCourses.value = cycleCourses.value.filter(cc => cc.id !== courseToRemove.id);
      courseSelected.value = null;
    }

    function handleSelectedCourse (selectedCourse) {
      root.$store.commit('courses/ADD_ASSIGNED_COURSE', {
        selectedCourse,
        callback () {
          cycleCourses.value.push(selectedCourse);
          root.$store.commit('cycles/ADD_COURSE_TO_CYCLE', {
            cycleNumber: props.number,
            course: selectedCourse
          });
        }
      });
    }

    return {
      courses,
      courseSelected,
      cycleCourses,
      availableCourses,
      handleRemoveCourse,
      handleSelectedCourse
    };
  }
};
</script>
