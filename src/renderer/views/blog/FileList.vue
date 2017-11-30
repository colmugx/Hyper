<template>
  <div class="file-list">
    <div class="toolbar">
      <div class="btn create" @click="$emit('create')">
        <i class="iconfont icon-file"></i>
      </div>
      <div class="btn review" @click="$emit('review')">
        <i class="iconfont icon-eyeo"></i>
      </div>
      <div class="btn deploy" @click="$emit('deploy')">
        <i class="iconfont icon-clouduploado"></i>
      </div>
    </div>
    <div class="list-wrapper">
      <ul class="article-list">
        <li class="article-item" v-for="(post, idx) in posts" :key="idx" @click="openPost(post)">
          <span class="status-mark" :style="{color: post.hidden ? '#ff8ec3' : '#8cdecc'}">{{ post.hidden ? '✘' : '✔' }}</span>
          <span class="article-item-link">{{ post.title | filename }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
import HexoSys from '../../../libs/HexoSys'
import { filename } from '../../filters/'

@Component({
  filters: {
    filename
  }
})
export default class FileList extends Vue {

  @State(state => state.App.blogPath) _path
  @Mutation('LOADPOST') loadarticle
  @Mutation('TITLE') setTitle

  posts: string[] = []

  readPosts() {
    let posts = HexoSys.readPosts(this._path)
    let postsarr: any[] = new Array()
    if (posts.indexOf('.DS_Store') > -1) {
      posts.splice(posts.indexOf('.DS_Store'), 1)
    }
    for (let i of posts) {
     postsarr.push({
       title: i,
       path: HexoSys.postLinks(this._path, i),
       hidden: i.substr(0, 1) === '_'
     })
    }
    console.log(postsarr)
    this.posts = postsarr
  }

  created () {
    this.readPosts()
  }

  openPost(post) {
    this.$parent['display'] = true
    this.loadarticle(post)
    this.setTitle('正在编辑 - ' + post.title)
    (<Vue>this).$router.replace({query: { id: post.title }})
  }

}
</script>

<style lang="stylus" scoped>
@import '../../styles/_partial/filelist.styl'
</style>

