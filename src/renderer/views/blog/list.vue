<template>
  <div class="posts-list">
    <file-list @create="createConfirm = true" ref="filelist"/>
    <div class="main-region" v-show="display" :class="{'blur': createConfirm || deleteConfirm}">
      <div class="toolbar">
        <div class="left-tool">
          <div class="btn edit" @click="toastTest()">
            <i class="iconfont icon-edit"></i>
          </div>
          <div class="btn save" @click="savePost()">
            <i class="iconfont icon-save"></i>
          </div>
          <div class="btn delete" @click="deleteConfirm = true">
            <i class="iconfont icon-delete"></i>
          </div>
        </div>
        <div class="right-tool">
          <div class="btn hidden">
            <bd-switch v-model="editing.hidden" />
          </div>
          <div class="btn close" @click="closeEditor()">
            <i class="iconfont icon-close"></i>
          </div>
        </div>
      </div>
      <div class="editor-region">
        <md-editor v-model="editing.data"></md-editor>
      </div>
    </div>

    <!-- 创建新文章Dialog -->
    <bd-dialog :visible.sync="createConfirm">
      <bd-input v-model="postName" name="文件名称"></bd-input>
      <div class="footer">
        <bd-button label="确定" size="tiny" @click.native="createPost(postName)" />
      </div>
    </bd-dialog>

    <!-- 删除文章Dialog -->
    <bd-confirm :visible.sync="deleteConfirm" :label="'是否确认删除：' + editing.title">
      <bd-button slot="footer" label="确定" size="tiny" @click.native="deletePost()" />
    </bd-confirm>

  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
import HexoSys from '../../../libs/HexoSys'
import FileSys from '../../../libs/FileSys'
import Command from '../../../console/hexo'
import { filename } from '../../filters/'
import bdSwitch from '../../components/Bandix-h/switch.vue'
import bdButton from '../../components/Bandix-h/button.vue'
import bdDialog from '../../components/Bandix-h/dialog.vue'
import bdConfirm from '../../components/Bandix-h/confirm.vue'
import Toast from '../../components/Bandix-h/toast'
import bdInput from '../../components/Bandix-h/input.vue'
import MdEditor from '../../components/common/Simplemde.vue'
import FileList from './FileList.vue'

@Component({
  components: {
    bdSwitch, bdButton, bdInput,
    bdDialog, bdConfirm,
    MdEditor, FileList
  }
})
export default class BlogList extends Vue {

  @State(state => state.App.blogPath) _path
  @State(state => state.Editor.artData) article
  @Mutation('TITLE') setTitle
  @Mutation('SAVEPOST') savePosts

  display: boolean = false
  serverPid: any = 0

  editing: any = {}

  postName: string = ''
  createConfirm: boolean = false
  deleteConfirm: boolean = false
  dialogTest = false

  onServer() {
    // let Cmd = new Command()
    // Cmd.server(this._path[0], (res) => {
    //   console.log(res)
    //   this.cmdLog = res.data
    //   this.serverPid = res.pid
    // })
  }

  createPost(val) {
    if (!val || val === '') return this.createConfirm = false
    let cmd = new Command()
    cmd.newpost(this._path, val, (data) => {
      console.log(data)
      this.$nextTick(() => {
        (<any>this).$refs['filelist'].readPosts()
      })
      this.createConfirm = false
      Toast('创建成功')
    })
  }

  savePost() {
    console.log('save')
    let save = Promise.resolve(this.savePosts(this.editing))
    save.then(() => {
      this.$nextTick(() => {
        (<any>this).$refs['filelist'].readPosts()
      })
      this.reload()
    })
  }

  deletePost() {
    let that = this
    FileSys.deleteFile(this.editing.path).then(() => {
      that.clear()
      that.$nextTick(() => {
        (<any>that).$refs['filelist'].readPosts()
      })
      Toast['danger']('成功删除文章')
    }, (err) => Toast(err))
  }

  clear() {
    this.deleteConfirm = false
    this.display = false
    this.editing = {}
    this.setTitle('文章列表')
  }

  reload() {
    this.editing = {}
    this.editing = Object.assign({}, this.article)
  }

  closeEditor() {
    this.display = false
    this.editing = {}
    this.setTitle('文章列表')
  }

  kill() {
    let Cmd = new Command()
    Cmd.stop(this.serverPid)
  }

 @Watch('display')
 onReading(val) {
   if (val) {
     this.editing = Object.assign({}, this.article)
   }
 }

 @Watch('$route')
 onChange(val) {
   this.reload()
 }

}
</script>

<style lang="stylus" scoped>
@import '../../styles/_mixins.styl'
.posts-list
  .main-region
    margin-left 200px
    height calc(100vh - 55px)
    transition all .1s
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
  .footer
    text-align right
    margin-top 16px

.blur
  background-color #fff
  opacity .4
  -webkit-filter blur(2px)
  filter blur(2px)
</style>
