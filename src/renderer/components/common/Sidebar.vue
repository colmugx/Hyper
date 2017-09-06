<template>
  <nav class="sidebar">
    <header class="nav-header">
      <h1 v-text="headers.title"></h1>
      <span v-text="headers.subtitle"></span>
    </header>
  </nav>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import FileSys from '../../libs/FileSys'

@Component
export default class SideBar extends Vue {

  // data
  headers: Object = {
    title: String,
    subtitle: String
  }

  created () {
    let obj = FileSys.readYml('/config/default.yml')
    console.log(obj)
    this.headers = obj.sidebar.headers
    console.log(this.headers)
  }

}
</script>

<style lang="stylus" scoped>

</style>

