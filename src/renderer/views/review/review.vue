<template>
  <div class="review">
    <div class="toolbar">
      <div class="btn prev" @click="">
        <i class="fa fa-arrow-left"></i>
      </div>
      <div class="btn next">
        <i class="fa fa-arrow-right"></i>
      </div>
      <div class="btn home">
        <i class="fa fa-home"></i>
      </div>
      <div class="btn reload">
        <i class="fa fa-refresh"></i>
      </div>
      <div class="inp-address">
        <span>{{ currentUrl }}</span>
      </div>
    </div>
    <webview id="webview" src="http://blog.co1mugx.tk" class="webview" autosize="on" ref="webview"></webview>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'

@Component
export default class ReviewPage extends Vue {

  currentTitle: String = "Review"
  currentUrl: string = ''


  @Mutation('TITLE') changeTitle

  mounted() {
    const webview = <any>document.querySelector('webview')
    webview.addEventListener('dom-ready', () => {
      this.currentTitle = this.currentTitle + ' - ' + webview.getTitle()
      this.currentUrl = webview.getURL()
    })
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
    margin 2px 0
    .btn
      margin 0 16px
      i
        font-size 16px
        color #515352
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
