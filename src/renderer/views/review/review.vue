<template>
  <div class="review">
    <div class="toolbar">
      <div class="btn prev" :class="{'disabled': prevDis}" @click="clickPrev()">
        <i class="iconfont icon-arrowleft"></i>
      </div>
      <div class="btn next" :class="{'disabled': nextDis}" @click="clickNext()">
        <i class="iconfont icon-arrowright"></i>
      </div>
      <div class="btn home" @click="clickHome()">
        <i class="iconfont icon-home"></i>
      </div>
      <div class="btn reload" @click="clickReload()">
        <i class="iconfont icon-reload"></i>
      </div>
      <div class="inp-address">
        <select v-model="currentUrl" class="address-select">
          <option v-for="item in optionUrl" :key="item" :value="item">{{item}}</option>
        </select>
      </div>
    </div>
    <webview id="webview" :src="currentUrl" class="webview" ref="webview"></webview>
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

  optionUrl: any[] = ['http://localhost:4000', 'http://0.0.0.0:4000']

  webView: any
  prevDis: Boolean = false
  nextDis: Boolean = false

  @State(state => state.App.blogPath) _path
  @Mutation('TITLE') changeTitle

  created () {
    let url: string = HexoSys.readConfig(this._path).url
    this.optionUrl.push(url)
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
