<template lang="pug">
el-card(shadow="never", class="cycle")
  section.cycle__header
    p Ciclo {{ number }}
    el-select(
      v-model="courseSelected",
      filterable,
      placeholder="Agregar curso al ciclo",
      @change="handleSelectedCourse"
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
import { ref, computed } from '@vue/composition-api';

export default {
  props: {
    number: {
      type: Number, required: true
    }
  },

  setup (_, { root }) {
    const cycleCourses = ref([]);
    const courseSelected = ref(null);

    const courses = computed(() => root.$store.state.courses.courses);

    const availableCourses = computed(
      () => courses.value
        .filter(course => !cycleCourses.value
          .map(cc => cc.id).includes(course.id)
        )
    );

    function handleRemoveCourse (courseToRemove) {
      cycleCourses.value = cycleCourses.value.filter(cc => cc.id !== courseToRemove.id);
      courseSelected.value = null;
    }

    function handleSelectedCourse (courseId) {
      const existsInCycleCourses = cycleCourses.value
        .find(cycleCourse => cycleCourse.id === courseId);

      if (!existsInCycleCourses) {
        const selectedCourse = courses.value.find(course => course.id === courseId);
        cycleCourses.value.push(selectedCourse);
      }
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
