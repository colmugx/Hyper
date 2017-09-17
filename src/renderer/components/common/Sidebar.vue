<template>
  <nav class="sidebar" ref="sidebar">
    <template v-for="(menu, index) in menus">
      <div class="sidebar-item" @click="currentPage = index" :class="{'selected': index === currentPage}" :key="menu.index">
        <i :class="'iconfont icon-' + menu.icon"></i>
      </div>
    </template>
    <div class="sidebar-item setting" @click="currentPage = 99" :class="{'selected': 99 === currentPage}">
      <i class="iconfont icon-setting"></i>
    </div>
  </nav>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
import FileSys from '../../libs/FileSys'

@Component
export default class SideBar extends Vue {

  @Mutation('TITLE') setTitle

  menus: string[]
  selected: boolean = false
  currentPage: number = 0

  // data
  created () {
    let obj = FileSys.readYml('/config/default.yml')
    this.menus = obj.sidebar.menu
    this.setTitle(this.menus[0]['name'])
  }

  @Watch('currentPage')
  onChangePage(val: number) {
    if (val === 99) {
      this.$emit('change', '/setting')
      this.setTitle('设置')
      return
    }
    this.$emit('change', this.menus[val]['path'])
    this.setTitle(this.menus[val]['name'])
  }

}
</script>

<style scoped>
@import url('../../assets/antd/iconfont.css');
</style>


<style lang="stylus">
@import '../../styles/_common/sidebar.styl'
</style>

