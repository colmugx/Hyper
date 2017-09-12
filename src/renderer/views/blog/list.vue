<template>
  <div class="posts-list">
    <div class="file-list">
      <div class="toolbar">
        <div class="btn edit" >
          <i class="iconfont icon-edit"></i>
        </div>
      </div>
      <div class="list-wrapper">
        <ul class="article-list">
          <li class="article-item" v-for="(post, idx) in posts" :key="idx">
            <span class="status-mark">{{ post.hidden ? '✘' : '✔' }}</span>
            <span class="article-item-link" :href="post.path">{{ post.name | filename }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="main-region"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { State } from 'vuex-class'
import HexoSys from '../../libs/HexoSys'
import Command from '../../../console/hexo'
import { filename } from '../../filters/'

@Component({
  filters: {
    filename
  }
})
export default class BlogList extends Vue {

  @State(state => state.App.blogPath) _path

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
        &.disabled
          i
            color #eee
            cursor default
    .list-wrapper
      overflow auto
      height calc(100vh - 56px)
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
</style>
