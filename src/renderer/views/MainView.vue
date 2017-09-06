<template>
  <div class="main-view">
    <div class="start-view">
      <h1 class="title">Hyper</h1>
      <span class="sub-title">您的贴心博客助手</span>
      <div class="btn-group">
        <button class="btn" @click="begin()">开始加载</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'

@Component
export default class MainView extends Vue {

@Mutation('SETPATH') setBlogPath

  begin() {
    (this as any).$electron.remote.dialog.showOpenDialog({ properties: ['openDirectory'] }, (val) => {
      if (val) {
        this.setBlogPath(val)
        this.$router.push('/blog/articles')
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
.start-view
  width 100vw
  height 100vh
  display flex
  flex-direction column
  align-items center
  justify-content center
  text-align center
  .title
    font-size 40px
    font-weight 100
  .sub-title
    margin-top 8px
    font-size 14px
  .btn
    outline none
    padding 8px 16px
    background-color transparent
    border none
    border 1px solid #767676
    border-radius 12px
    font-size 12px
    color #000
    margin-top 24px
    cursor pointer
</style>

