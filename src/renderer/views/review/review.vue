<template>
  <div class="review">
    <div class="toolbar">
      <div class="btn prev" :class="{'disabled': prevDis}" @click="clickPrev()">
        <i class="fa fa-arrow-left"></i>
      </div>
      <div class="btn next" :class="{'disabled': nextDis}" @click="clickNext()">
        <i class="fa fa-arrow-right"></i>
      </div>
      <div class="btn home" @click="clickHome()">
        <i class="fa fa-home"></i>
      </div>
      <div class="btn reload" @click="clickReload()">
        <i class="fa fa-refresh"></i>
      </div>
      <div class="inp-address">
        <span>{{ currentUrl }}</span>
      </div>
    </div>
    <webview id="webview" :src="currentUrl" class="webview" autosize="on" ref="webview"></webview>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
import HexoSys from '../../libs/hexoSys'

@Component
export default class ReviewPage extends Vue {

  currentTitle: String = "Review"
  currentUrl: string = ''

  prevDis: Boolean = false
  nextDis: Boolean = false

  @State(state => state.App.blogPath) _path
  @Mutation('TITLE') changeTitle

  created () {
    let url: string = HexoSys.readConfig(this._path[0]).url
    this.currentUrl = url
  }

  mounted() {
    const webview = <any>document.querySelector('webview')
    webview.addEventListener('dom-ready', () => {
      this.currentTitle = 'Review - ' + webview.getTitle()
    })
  }

  updated() {
    const webview = <any>document.querySelector('webview')
    if (!(webview.canGoBack())) this.prevDis = true
    else this.prevDis = false
    if (!(webview.canGoForward())) this.nextDis = true
    else this.nextDis = false
  }

  clickPrev() {
    if (this.prevDis) return
    const webview = <any>document.querySelector('webview')
    webview.goBack()
  }

  clickNext() {
    if (this.nextDis) return
    const webview = <any>document.querySelector('webview')
    webview.goForward()
  }

  clickReload() {
    if (this.nextDis) return
    const webview = <any>document.querySelector('webview')
    webview.reload()
  }

  clickHome() {
    if (this.nextDis) return
    const webview = <any>document.querySelector('webview')
    webview.loadURL(this.currentUrl)
  }

  @Watch('currentTitle')
  titleChange(val: string) {
    this.changeTitle(val)
  }
}
</script>


<style lang="stylus" scoped>
.review
  .toolbar
    display flex
    flex-direction row
    align-items center
    min-height 32px
    padding-bottom 4px
    margin-bottom 2px
    .btn
      margin 0 16px
      i
        font-size 16px
        color #515352
      &.disabled
        i
          color #eee
          cursor default
    .inp-address
      flex 1
      min-height 25px
      margin-right 16px
      font-size 14px
      padding 4px 8px
      box-shadow inset 0px 0px 2px 0px #ccc
      color #666
  .webview
    height calc(100vh - 22px)
    width 100%
</style>
