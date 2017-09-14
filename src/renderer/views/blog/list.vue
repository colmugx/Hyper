<template>
  <div class="posts-list">
    <div class="file-list">
      <div class="toolbar">
        <div class="btn edit" >
          <i class="iconfont icon-file"></i>
        </div>
        <div class="btn deploy">
          <i class="iconfont icon-clouduploado"></i>
        </div>
      </div>
      <div class="list-wrapper">
        <ul class="article-list">
          <li class="article-item" v-for="(post, idx) in posts" :key="idx" @click="openPost(post.path, post.name)">
            <span class="status-mark" :style="{color: post.hidden ? '#ff8ec3' : '#8cdecc'}">{{ post.hidden ? '✘' : '✔' }}</span>
            <span class="article-item-link">{{ post.name | filename }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="main-region" v-show="display">
      <div class="toolbar">
        <div class="left-tool">
          <div class="btn edit">
            <i class="iconfont icon-edit"></i>
          </div>
          <div class="btn save">
            <i class="iconfont icon-save"></i>
          </div>
        </div>
        <div class="right-tool">
          <div class="btn hidden">
            <bd-switch />
          </div>
          <div class="btn close" @click="closeEditor()">
            <i class="iconfont icon-close"></i>
          </div>
        </div>
      </div>
      <div class="editor-region">
        <md-editor ></md-editor>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
import HexoSys from '../../libs/HexoSys'
import Command from '../../../console/hexo'
import { filename } from '../../filters/'
import bdSwitch from '../../components/Bandix-h/switch'
import MdEditor from '../../components/common/Simplemde'

@Component({
  components: {
    bdSwitch,
    MdEditor
  },
  filters: {
    filename
  }
})
export default class BlogList extends Vue {

  @State(state => state.App.blogPath) _path
  @Mutation('TITLE') setTitle

  display: Boolean = false
  posts: string[] = []
  serverPid: any = 0

  created () {
    this.readPosts()
  }

  readPosts() {
    let posts = HexoSys.readPosts(this._path[0])
    let postsarr: any[] = new Array()
    if (posts.indexOf('.DS_Store') > -1) {
      posts.splice(posts.indexOf('.DS_Store'), 1)
    }
    for (let i of posts) {
     postsarr.push({
       name: i,
       path: HexoSys.postLinks(this._path[0], i),
       hidden: i.substr(0, 1) === '_'
     })
    }
    console.log(postsarr)
    this.posts = postsarr
  }

  onServer() {
    // let Cmd = new Command()
    // Cmd.server(this._path[0], (res) => {
    //   console.log(res)
    //   this.cmdLog = res.data
    //   this.serverPid = res.pid
    // })
  }

  openPost(p, n) {
    this.display = true
    this.setTitle('正在编辑 - ' + n)
  }

  closeEditor() {
    this.display = false
    this.setTitle('文章列表')
  }

  kill() {
    let Cmd = new Command()
    Cmd.stop(this.serverPid)
  }

}
</script>

<style lang="stylus" scoped>
@import '../../styles/_mixins.styl'
.posts-list
  .file-list
    width 200px
    box-shadow 1px 3px 2px -1px #7d7878
    float left
    .toolbar
      display flex
      flex-direction row
      align-items center
      min-height 32px
      padding 4px 0
      position relative
      &:after
        content ''
        position absolute
        bottom 0
        left 0
        right 0
        height 1px
        background-color #f0f0f0
      .btn
        margin 0 16px
        i
          font-size 16px
          color #515352
        &.deploy i
          font-size 20px
        &.disabled
          i
            color #eee
            cursor default
    .list-wrapper
      overflow auto
      height calc(100vh - 54px)
      .article-list
        list-style none
        .article-item
          color #666
          font-size 14px
          min-height 24px
          border-line(bottom, #ccc)
          padding 8px
          line-height 1.3
          overflow hidden
          cursor default
          -webkit-user-select none
          &:hover
            background linear-gradient(150deg, #fdfbfb 0%, #eef0f2 100%)
          &:active:hover
            box-shadow inset 1px 0px 8px -1px #cfd9df
          .status-mark
            color #C6C6C6
            font-size 10px
            margin 0 2px
          .article-item-link
            border-left 1px solid #ccc
            padding-left 4px
            color inherit
            text-decoration none
            word-break break-all
  .main-region
    margin-left 200px
    height calc(100vh - 55px)
    .toolbar
      display flex
      flex-direction row
      align-items center
      justify-content space-between
      min-height 32px
      padding 4px 0
      position relative
      &:after
        content ''
        position absolute
        bottom 0
        left 0
        right 0
        height 1px
        background-color #f0f0f0
      .left-tool
      .right-tool
        .btn
          display inline
          margin 0 16px
          transition text-shadow .3s
          cursor pointer
          &:hover
            text-shadow 1px 1px 1px #bab9b9
          i
            font-size 18px
            color #515352
      .right-tool
        display flex
        flex-direction row
        align-items center
    .editor-region
      height 100%
</style>
