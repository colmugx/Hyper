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
import HexoSys from '../../libs/HexoSys'

@Component
export default class ReviewPage extends Vue {

  currentTitle: String = "Review"
  currentUrl: string = ''

  webView: any
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
    this.webView = webview
    webview.addEventListener('dom-ready', () => {
      this.currentTitle = 'Review - ' + webview.getTitle()
    })
  }

  updated() {
    if (!(this.webView.canGoBack())) this.prevDis = true
    else this.prevDis = false
    if (!(this.webView.canGoForward())) this.nextDis = true
    else this.nextDis = false
  }

  clickPrev() {
    if (this.prevDis) return
    this.webView.goBack()
  }

  clickNext() {
    if (this.nextDis) return
    const webview = <any>document.querySelector('webview')
    this.webView.goForward()
  }

  clickReload() {
    if (this.nextDis) return
    const webview = <any>document.querySelector('webview')
    this.webView.reload()
  }

  clickHome() {
    if (this.nextDis) return
    const webview = <any>document.querySelector('webview')
    this.webView.loadURL(this.currentUrl)
  }

  @Watch('currentTitle')
  titleChange(val: string) {
    this.changeTitle(val)
  }
}
</script>


<style lang="stylus" scoped>
@import '../../styles/_partial/review.styl'
</style>
