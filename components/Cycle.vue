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
        v-for="course in availableCourses" :key="course.value",
        :label="course.label",
        :value="course.value"
      )
  section.cycle__courses
    el-tag(
      v-for="cycleCourse in cycleCourses" :key="cycleCourse.value",
      type="primary",
      effect="dark",
      size="small",
      class="cycle__courses__tag",
      closable,
      @close="handleRemoveCourse(cycleCourse)"
    ) {{ cycleCourse.label }}

</template>

<script>
import { ref, computed } from '@vue/composition-api';

export default {
  props: {
    number: {
      type: Number, required: true
    }
  },

  setup () {
    const courses = ref([
      { value: '1', label: 'foo' },
      { value: '2', label: 'bar' }
    ]);

    const cycleCourses = ref([]);

    const courseSelected = ref(null);

    function handleRemoveCourse (courseToRemove) {
      cycleCourses.value = cycleCourses.value.filter(cc => cc.value !== courseToRemove.value);
      courseSelected.value = null;
    }

    function handleSelectedCourse (courseValue) {
      const existsInCycleCourses = cycleCourses.value
        .find(cycleCourse => cycleCourse.value === courseValue);

      if (!existsInCycleCourses) {
        const selectedCourse = courses.value.find(course => course.value === courseValue);
        cycleCourses.value.push(selectedCourse);
      }
    }

    const availableCourses = computed(
      () => courses.value
        .filter(course => !cycleCourses.value
          .map(cc => cc.value).includes(course.value)
        )
    );

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
