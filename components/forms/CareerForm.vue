<template lang="pug">
el-form(label-width="80px", clas="w-100")
  el-row(
    :gutter="24"
  )
    el-col(:md="10")
      el-form-item(label="Nombre")
        el-input(
          v-model="input"
        )
    el-col(:md="5")
      el-form-item(label="Ciclos")
        el-input-number(
          v-model="input"
        )
    el-col(:md="4")
      el-form-item()
        el-checkbox(
        ) Option

    el-col(:md="10")
      el-form-item(label="Código")
        el-input(
          v-model="input"
        )
    el-col(:md="8")
      el-form-item(label="Facultad")
        el-select(
          placeholder="Seleccione"
        )
          el-option(
            label="foo",
            value="foo"
          )
</template>

<script>
export default {
  data () {
    return {
      input: ''
    };
  }
};
</script>
