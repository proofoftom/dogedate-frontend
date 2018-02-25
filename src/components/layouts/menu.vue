<template>
  <q-layout ref="layout" view="hHr LpR lFf" :right-breakpoint="1100">
    <q-toolbar slot="header">
      <q-btn flat @click="$refs.layout.toggleLeft()">
        <q-icon name="menu" />
      </q-btn>
      <q-toolbar-title>
        {{ title }}
      </q-toolbar-title>
    </q-toolbar>

    <!-- Left Side Panel -->
    <div slot="left">
      <q-list-header>Menu</q-list-header>
      <q-list no-border link inset-separator>
        <q-side-link item to="/pound">
          <q-item-side icon="fa-institution" />
          <q-item-main label="The PounÐ"/>
        </q-side-link>
        <q-side-link item to="/date">
          <q-item-side icon="fa-heartbeat" />
          <q-item-main label="Ðoge Ðate"/>
        </q-side-link>
        <q-side-link item to="#">
          <q-item-side icon="fa-trophy" />
          <q-item-main label="Ðoge Show"/>
        </q-side-link>
        <hr>
        <q-side-link item to="/pack">
          <q-item-side icon="grain" />
          <q-item-main label="My Pack"/>
        </q-side-link>
        <q-item class="item" :go-back="'/'" @click="logout()">
          <q-item-side>
            <q-item-tile icon="exit_to_app" />
          </q-item-side>
          <q-item-main>
            <q-item-tile label>Logout</q-item-tile>
          </q-item-main>
        </q-item>
      </q-list>
    </div>

    <router-view />
  </q-layout>
</template>

<style>
.q-toolbar {
  background-color: black;
}
</style>

<script>
  import { GoBack, QLayout, QToolbar, QBtn, QIcon, QToolbarTitle, QList, QSideLink, QItemSide, QItemMain, QItem, QItemTile, QListHeader } from 'quasar'
  import Auth from '../../auth'

  export default{
    data () {
      return {
        title: ''
      }
    },

    watch: {
      '$route' () {
        this.title = this.$route.meta.title
      }
    },

    mounted () {
      this.title = this.$route.meta.title
    },

    methods: {
      logout () {
        Auth.logout()
      }
    },

    components: { QLayout, QToolbar, QBtn, QIcon, QToolbarTitle, QList, QSideLink, QItemSide, QItemMain, QItem, QItemTile, QListHeader },

    directives: { GoBack }
  }
</script>
