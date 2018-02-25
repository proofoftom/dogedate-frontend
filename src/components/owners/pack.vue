<template>
  <div>
    <div class="layout-view">
      <div class="text-center">
        <h1>{{ owner.name }}'s Pack</h1>
      </div>
      <div class="text-center layout-padding">
        <q-card inline style="width: 300px" v-for="doge in doges" :key="doge.id">
          <a :href="'#/doges/' + doge.id">
            <div class="text-center" style="padding: 30px;">
              <img :src="doge.image" style="max-height: 100px">
            </div>
          </a>
          <q-card-separator />
          <q-card-title>
            <a :href="'#/doges/' + doge.id">{{ doge.name }}</a>
            <q-checkbox
              slot="subtitle"
              v-model="checked"
              checked-icon="pets"
              unchecked-icon="pets"
              label="3"
            />
            <div slot="right" class="row items-center">
              <b>For sale</b> <q-icon name="swap calls" /> 0.0032
            </div>
          </q-card-title>
          <q-card-separator />
          <q-card-main>
            <img alt="double helix" class="gene-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGbSURBVFhH7dZNK0RRHMfxIZQF3oCFlaJkwdIGSSRFsvMOkBKRiLJiRbFSVjbegawUL0CJPCyQN0BRytP3e5tbspk5985kFvOrTzlH53/uveeeMzdTTjmlnBd8oy5qJUstrPEatQJzBQe3RK1kaYM1bqNWYA7g4Gn0Z/9OylrBGYGDz1GFo2w7iXEEpxrXsMCkHYFZgmN9/N5AogzgC+/osSPPDOMDju2zI03W4Z34Jg+hCWfZvlxWkToV2IIFvatl1GAt2/47aWwTBY3vQTzhKX5vz0Ycw/+5XFMoSlzPR8QT+Yh9GhtwvW/QiaKmAfuIH/UlutCBNKdm3qnHHuIL0Cd24cUVNW7FezjpG+axApfDvid0o+BxJ7jerrMTnaAZcVoRb01f1EUULJWI19ziC/CUzLUNd+CFp842LOhBNIiQg8hDLFXGYCHXuNeOPON29em4ZB7nieL+foAXMGtHYObgWM8Glyw4E7DABSyQ5ud4FME5hINn8C8fJHdwcJpPsnZYw8+74PjWOzjN8erJaI3nqFVOOaWXTOYHPHK+Rva+tQEAAAAASUVORK5CYII=">
            <h6>Genes</h6>
            <q-card-separator />
            <a href="#">
              <q-chip v-for="gene in doge.genes" :key="gene.id" small tag color="black">
                {{ gene }}
              </q-chip>
            </a>
          </q-card-main>
        </q-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.q-card {
  width: 300px;
}
.q-card:hover {
  transform: scale(1.05) rotateZ(-2deg);
  transition: all .4s ease-in-out;
}
.q-card a {
  color: black;
}
.doge-pic-wrapper {
  padding: 30px;
}
.doge-pic {
  max-height: 100px;
}
.q-card-main .gene-icon {
  float: left;
}
.q-card-main h6 {
  text-align: left;
}
.q-chip {
  margin: 5px 5px 0 0;
}
.q-chip-main a {
  color: white;
}
.q-chip:hover {
  transform: scale(1.05);
  transition: all .1s ease-in-out;
  cursor: pointer;
}
.pop:hover {
  transform: scale(1.1);
  transition: all .1s ease-in-out;
}
</style>

<script>
  import { LocalStorage, Toast, QCard, QCardTitle, QCardSeparator, QCardMain, QIcon, QCheckbox, QChip } from 'quasar'
  import axios from 'axios'
  import menu from '../layouts/menu'

  export default{
    data () {
      return {
        doges: {},
        checked: false,
        // Todo: scale to viewing other owners than one's self
        owner: LocalStorage.get.item('owner').data
      }
    },

    mounted () {
      this.fetchDoges()
    },

    methods: {
      fetchDoges () {
        axios.get('owner/' + this.owner.id + '/pack')
          .then((response) => {
            this.doges = response.data.data
          }, () => {
            Toast.create.negative('Something went wrong!')
          })
      }
    },

    components: { 'q-menu': menu, LocalStorage, Toast, QCard, QCardTitle, QCardSeparator, QCardMain, QIcon, QCheckbox, QChip }
  }
</script>
