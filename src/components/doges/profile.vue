<template>
  <div>
    <div class="layout-view">
      <div class="text-center layout-padding">
        <h1>{{ doge.name }}</h1>
        <div class="text-center doge-pic-wrapper">
          <img :title="doge.name" :src="doge.image" class="doge-pic">
        </div>
        <!--
          That'd be cool if you could integrate particle.js on
          a small scale level as an avatar
          Todo: Use owner image
        -->
        <b>Owner:</b> <img class="avatar" :src="doge.owner.image">
        <span>{{ doge.owner.name }}</span>
        <hr/>
        <h5>Genes:</h5>
        <div class="gene-wrapper">
          <q-chip class="pop" v-for="gene in doge.genes" :key="gene.id" small tag color="black">
          <a href="#">
            {{ gene }}
          </a>
        </q-chip>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.doge-pic-wrapper {
  padding-bottom: 30px;
}
.doge-pic {
  max-height: 200px;
}
.gene-wrapper {
  display: inline-block;
  width: 50%;
}
.q-chip {
  margin: 0 5px 5px 0;
}
.q-chip-main a {
  color: white;
}
.pop:hover {
  transform: scale(1.05);
  transition: all .1s ease-in-out;
}
</style>

<script>
  import { Toast, LocalStorage, QChip } from 'quasar'
  import menu from '../layouts/menu'
  import axios from 'axios'

  export default{
    data () {
      return {
        currentOwner: LocalStorage.get.item('owner').data,
        doge: {
          name: '',
          // Todo: Set default loading image.
          image: ''
        }
      }
    },

    mounted () {
      this.fetchDoge()
    },

    methods: {
      fetchDoge () {
        axios.get('doges/' + this.$route.params.id)
          .then((response) => {
            this.doge = response.data.data
          }, () => {
            Toast.create.negative('Something went wrong!')
          })
      }
    },

    components: { 'q-menu': menu, Toast, QChip }
  }
</script>
