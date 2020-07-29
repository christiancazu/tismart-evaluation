<template>
<el-aside
  :class="[
    { 'sidebar--collapse': isCollapse },
    'sidebar shadow'
  ]"
>
  <el-container
    :class="[
      { 'sidebar--collapse': isCollapse },
      'sidebar__container'
    ]"
    direction="vertical"
  >
    <!-- SIDEBAR HEADER -->
    <section
      class="sidebar__header" :class="[
        { 'px-0 mx-0': isCollapse },
      ]"
    >
      <el-avatar
        src="/img/app-logo.png"
        :class="[
          { 'sidebar__header__avatar--collapse': isCollapse },
          'sidebar__header__avatar'
        ]"
      />
      <template v-if="!isCollapse">
        <div class="sidebar__header__separator" />
        <div class="sidebar__header__info">
          <p class="sidebar__header__info--caption">{{ country.placeholder }}</p>
          <p class="sidebar__header__info--title">{{ country.name }}</p>
        </div>
      </template>
    </section>

    <!-- SIDEBAR SUBHEADER -->
    <section
      v-show="!isCollapse"
      class="sidebar__subheader"
    >
      <div class="sidebar__subheader__info">
        <p class="sidebar__subheader__info--title">{{ user.fullname }}</p>
        <p class="sidebar__subheader__info--caption">{{ user.role }}</p>
        <i class="el-icon-arrow-left" /><span>PUCP</span>
      </div>
      <i class="el-icon-upload2 icon-logout" />
    </section>

    <!-- SIDEBAR MENU -->
    <section
      :class="[
        { 'sidebar--collapse': isCollapse },
        'sidebar__menu'
      ]"
    >
      <el-menu
        default-active="3"
        :collapse="isCollapse"
        background-color="transparent"
      >
        <el-menu-item
          v-for="(nav, index) in navs" :key="index"
          :index="index + 1"
        >
          <i :class="nav.icon" />
          <span
            slot="title"
            class="sidebar__menu--text"
          >
            {{ nav.name }}
          </span>
        </el-menu-item>
      </el-menu>
    </section>

    <!-- SIDEBAR COLLAPSE BTN -->
    <section class="sidebar__collapse-btn">
      <el-button
        type="primary"
        :icon="isCollapse ? 'el-icon-right' : 'el-icon-back'"
        size="small"
        @click="isCollapse = !isCollapse"
      />
    </section>
  </el-container>
</el-aside>
</template>

<script>
import { reactive, ref } from '@vue/composition-api';
export default {
  data () {
    return {
      isCollapse: false
    };
  },

  setup () {
    const navs = ref([
      { name: 'inicio', icon: 'el-icon-s-home' },
      { name: 'reportes', icon: 'el-icon-tickets' },
      { name: 'carreras', icon: 'el-icon-edit-outline' },
      { name: 'cursos', icon: 'el-icon-notebook-2' },
      { name: 'profesores', icon: 'el-icon-s-custom' },
      { name: 'alumnos', icon: 'el-icon-user' },
      { name: 'solicitudes', icon: 'el-icon-receiving' }
    ]);

    const country = reactive({
      name: 'Perú',
      placeholder: 'PAÍS'
    });

    const user = reactive({
      fullname: 'Christian Carrillo',
      role: 'Administrador País'
    });

    return {
      navs,
      country,
      user
    };
  }
};
</script>
