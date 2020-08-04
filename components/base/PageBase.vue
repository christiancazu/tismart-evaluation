<template lang="pug">
el-container.page
  el-header.page__header
    img(src="/img/path-3.svg")
    div {{ title }}

  el-main.px-0
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
