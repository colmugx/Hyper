<template>
  <div id="title-bar">
    <span class="app-title" v-text="title" :style="styles"></span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component({
  name: 'title-bar'
})
export default class TitleBar extends Vue {

  @State(state => state.Windows.appTitle) currentTitle

  get title() {
    return this.currentTitle ? this.currentTitle : document.title
  }

  @Watch('$route')
  routeChange(to: any, from: any) {
    return this.currentTitle
  }

  get styles() {
    return {
      backgroundColor: 'transparent'
    }
  }
}
</script>


<style lang="stylus" scoped>
#title-bar
  position relative
  z-index 9999
  width 100%
  height 22px
  background-color transparent
  text-align center
  .app-title
    font-size 12px
    font-weight 300
</style>
