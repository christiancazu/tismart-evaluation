<template lang="pug">
el-container.page
  el-header.page__header
    i.el-icon-arrow-left
    div {{ title }}

  el-main
    slot
</template>

<script>
export default {
  props: {
    title: {
      type: String, required: true
    }
  }
};
</script>
