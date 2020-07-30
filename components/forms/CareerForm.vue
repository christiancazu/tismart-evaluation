<template lang="pug">
section
  el-form(
    ref="refForm",
    :model="form",
    :rules="rules",
    status-icon,
    label-width="80px",
    class="form"
  )
    el-row(
      :gutter="24"
    )
      el-col(:md="10")
        el-form-item(label="Nombre", prop="name")
          el-input(
            v-model="form.name"
          )
      el-col(:md="5")
        el-form-item(label="Ciclos", prop="cycles")
          el-input-number(
            v-model="form.cycles",
            :min="0",
            :max="10",
            @change="onChangeCycles"
          )
      el-col(:md="4")
        el-form-item(prop="cycleZero")
          el-checkbox(
            v-model="form.cycleZero"
          ) Ciclo 0

      el-col(:md="10")
        el-form-item(label="Código", prop="code")
          el-input(
            v-model="form.code",
            @input="form.code = $event.toUpperCase()"
          )
      el-col(:md="8")
        el-form-item(label="Facultad", prop="facultie")
          el-select(
            placeholder="Seleccione"
            v-model="form.facultie"
          )
            el-option(
              label="foo",
              value="foo"
            )

  p.cycles Cursos por Carrera

  //- cycle zero
  cycle(
    v-if="form.cycleZero",
    :number="0"
  )
  //- cycles
  cycle(
    v-for="cycle, index in form.cycles" :key="index",
    :number="index + 1"
  )
</template>

<script>
import * as RULES from '@/config/form.rules';

import { reactive } from '@vue/composition-api';

export default {
  setup () {
    const form = reactive({
      name: 'Comunicación',
      code: 'CD2-12HR',
      cycles: 0,
      cycleZero: true,
      facultie: null
    });

    const rules = reactive({
      name: RULES.name,
      code: RULES.code,
      cycles: RULES.cycle,
      cycleZero: RULES.cycleZero,
      facultie: RULES.facultie
    });

    function onChangeCycles (amount) {
      form.cycles = amount;
    }

    return {
      form,
      rules,
      onChangeCycles
    };
  }
};
</script>
