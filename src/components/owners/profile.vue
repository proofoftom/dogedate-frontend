<template>
  <div>
    <div class="layout-view">
      <div class="text-center">
        <h1>Your Profile</h1>
      </div>
    </div>
  </div>
</template>

<script>
  import { LocalStorage } from 'quasar'
  import menu from '../layouts/menu'

  export default{
    data () {
      return {
        owner: LocalStorage.get.item('owner')
      }
    },

    components: { 'q-menu': menu }
  }
</script>
