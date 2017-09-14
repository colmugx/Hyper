<template>
  <div id="app">
    <title-bar></title-bar>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
import TitleBar from './components/common/TitleBar'

@Component({
  name: 'Hyper',
  components: {
    TitleBar
  }
})
export default class App extends Vue {

  @Mutation('SETPATH') setBlogPath
  created() {
    if (localStorage.getItem('blogPath')) {
      this.setBlogPath(localStorage.getItem('blogPath'))
    }
  }
}
</script>

<style lang="stylus">
@import 'styles/_global.styl'
</style>
