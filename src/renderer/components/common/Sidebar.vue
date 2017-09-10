<template>
  <nav class="sidebar" ref="sidebar">
    <template v-for="(menu, index) in menus">
      <div class="sidebar-item" @click="currentPage = index" :class="{'selected': index === currentPage}" :key="menu.index">
        <i :class="'fa fa-' + menu.icon"></i>
      </div>
    </template>
    <div class="sidebar-item setting" @click="currentPage = 99" :class="{'selected': 99 === currentPage}">
      <i class="fa fa-cog"></i>
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

  menus: String[]
  selected: Boolean = false
  currentPage: Number = 0

  // data
  created () {
    let obj = FileSys.readYml('/config/default.yml')
    this.menus = obj.sidebar.menu
  }

  @Watch('currentPage')
  onChangePage(val: any) {
    if (val === 99) {
      this.$emit('change', '/setting')
      this.setTitle('设置')
      return
    }
    this.$emit('change', this.menus[val]['path'] as any)
    this.setTitle(this.menus[val]['name'])
  }

}
</script>

<style scoped>
@import url('../../assets/css/font-awesome.min.css');
</style>


<style lang="stylus">
@import '../../styles/_common/sidebar.styl'
</style>

