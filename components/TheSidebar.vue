<template lang="pug">
el-aside(
  :class="isCollapse && 'sidebar--collapse'",
  class="sidebar shadow"
)

  el-container(
    :class="isCollapse && 'sidebar--collapse'",
    direction="vertical",
    class="sidebar__container"
  )

    //- SIDEBAR HEADER
    section(
      :class="isCollapse && 'px-0 mx-0'",
      class="sidebar__header"
    )
      el-avatar(
        src="/img/app-logo.png",
        :class="isCollapse && 'sidebar__header__avatar--collapse'"
      ).sidebar__header__avatar
      template(v-if="!isCollapse")
        div.sidebar__header__separator
        div.sidebar__header__info
          p.sidebar__header__info--caption {{ country.placeholder }}
          p.sidebar__header__info--title {{ country.name }}

    //- SIDEBAR SUBHEADER
    section(
      v-show="!isCollapse",
      class="sidebar__subheader"
    )
      div.sidebar__subheader__info
        p.sidebar__subheader__info--title {{ user.fullname }}
        p.sidebar__subheader__info--caption {{ user.role }}
        i.el-icon-arrow-left
        span PUCP
      i.el-icon-upload2.icon-logout

    //- SIDEBAR MENU
    section(
      :class="isCollapse && 'sidebar--collapse'",
      class="sidebar__menu"
    )
      el-menu(
        default-active="3",
        :collapse="isCollapse",
        background-color="transparent"
      )
        el-menu-item(
          v-for="nav in navs" :key="nav.id",
          :index="nav.id"
         )
          i(:class="nav.icon")
          span(
            slot="title",
            class="sidebar__menu--text"
          ) {{ nav.name }}

    //- SIDEBAR COLLAPSE BTN
    section.sidebar__collapse-btn
      el-button(
        type="primary",
        :icon="isCollapse ? 'el-icon-right' : 'el-icon-back'",
        size="small",
        @click="isCollapse = !isCollapse"
      )
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
      { id: '1', name: 'inicio', icon: 'el-icon-s-home' },
      { id: '2', name: 'reportes', icon: 'el-icon-tickets' },
      { id: '3', name: 'carreras', icon: 'el-icon-edit-outline' },
      { id: '4', name: 'cursos', icon: 'el-icon-notebook-2' },
      { id: '5', name: 'profesores', icon: 'el-icon-s-custom' },
      { id: '6', name: 'alumnos', icon: 'el-icon-user' },
      { id: '7', name: 'solicitudes', icon: 'el-icon-receiving' }
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
