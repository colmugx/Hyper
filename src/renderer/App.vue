<template>
  <div id="app">
    <title-bar></title-bar>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import TitleBar from './components/common/TitleBar'

@Component({
  name: 'Hyper',
  components: {
    TitleBar
  }
})
export default class App extends Vue {
}
</script>

<style lang="stylus">
@import 'styles/_global.styl'
</style>
