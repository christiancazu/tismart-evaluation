<template lang="pug">
page-base(title="Nueva Carrera")
  career-form
</template>

<script>
import notifyUtil from '@/utils/notify.util';

export default {
  async asyncData ({ store }) {
    try {
      await store.dispatch('courses/get');
      await store.dispatch('faculties/get');
    } catch (error) {
      notifyUtil.error();
    }
  }
};
</script>
