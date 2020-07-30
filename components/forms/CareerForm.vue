<template lang="pug">
div
  section
    el-form(
      ref="refForm",
      :model="form",
      :rules="rules",
      status-icon,
      label-width="80px",
      class="form",
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
          el-form-item()
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
          el-form-item(label="Facultad", prop="faculty")
            el-select(
              placeholder="Seleccione"
              v-model="form.faculty"
            )
              el-option(
                v-for="faculty in faculties" :key="faculty.id",
                :label="faculty.name",
                :value="faculty.id"
              )

    div.cycles
      p.cycles__title Cursos por Carrera

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

  //- form actions
  section(class="form__actions")
    el-card(
      shadow="never",
      class="form__actions__card"
    )
      el-button(
        type="primary",
        round,
        plain,
        class="uppercase"
      ) Cancelar
      el-button(
        :loading="processingSubmit",
        :disabled="!availableSubmit"
        type="primary",
        round,
        class="uppercase",
        @click="submitForm"
      ) Guardar
</template>

<script>
import * as RULES from '@/config/form.rules';

import { reactive, computed, ref, watch } from '@vue/composition-api';
import notifyUtil from '@/utils/notify.util';

export default {
  setup (_, { root }) {
    const form = reactive({
      name: '',
      code: '',
      cycles: 0,
      cycleZero: false,
      faculty: null
    });

    const rules = reactive({
      name: RULES.name,
      code: RULES.code,
      faculty: RULES.faculty
    });

    const refForm = ref(null);
    const availableSubmit = ref(false);
    const processingSubmit = ref(false);

    const faculties = computed(() => root.$store.state.faculties.faculties);
    const existsCoursesInAllCycles = computed(() => root.$store.getters['cycles/existsCoursesInAllCycles']);
    const existsCycles = computed(() => root.$store.getters['cycles/existsCycles']);
    const createdCycles = computed(() => root.$store.state.cycles.createdCycles);

    watch(() => form.name, () => checkFormValid());
    watch(() => form.code, () => checkFormValid());
    watch(() => form.faculty, () => checkFormValid());

    function onChangeCycles (amount) {
      form.cycles = amount;
    }

    function submitForm () {
      checkFormValid();

      switch (true) {
        // no cycles
        case !existsCycles.value:
          notifyUtil.warning('debe Elegir algún ciclo');
          break;

        // no courses in cycles
        case !existsCoursesInAllCycles.value:
          notifyUtil.warning('Los ciclos deben de contener cursos, añada al menos uno');
          break;

        // valid params to prepared request
        default:
          sendRequest();
      }
    }

    async function sendRequest () {
      const requestFaculty = faculties.value.find(faculty => faculty.id === form.faculty);
      const requestCourses = createdCycles.value.map(cc => cc.courses.map(c => ({ _id: c.id, name: c.name }))).flat(Infinity);

      const data = {
        name: form.name,
        code: form.code,
        faculty: {
          _id: requestFaculty.id,
          name: requestFaculty.name
        },
        courses: requestCourses
      };

      try {
        processingSubmit.value = true;

        await root.$store.dispatch('careers/create', data);

        notifyUtil.success('La carrera ha sido creada con éxito');

        resetForm();
      } catch (error) {
        if (error.response.status === 409) {
          notifyUtil.error('El código de carrera ya existe, intente con uno diferente');
        } else {
          notifyUtil.error('Algo sucedió mal al intentar crear la carrera, intente más tarde');
        }
      } finally {
        processingSubmit.value = false;
      }
    }

    function checkFormValid () {
      refForm.value.validate((valid) => {
        if (valid) {
          availableSubmit.value = true;
        } else {
          availableSubmit.value = false;
        }
      });
    }

    function resetForm () {
      form.cycles = 0;
      refForm.value.resetFields();
      root.$store.commit('courses/RESET_ASSIGNED_COURSE');
      setTimeout(() => {
        refForm.value.clearValidate(['name', 'code', 'faculty']);
      }, 500);
    }

    return {
      form,
      refForm,
      rules,
      faculties,
      onChangeCycles,
      availableSubmit,
      processingSubmit,
      submitForm
    };
  }
};
</script>
