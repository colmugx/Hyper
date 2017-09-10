<template>
  <div class="app-settings">
    <header class="header">
      <h2 class="header-title">简易设置</h2>
      <span class="header-desc">快速配置您的博客</span>
    </header>
    <div class="settings-wrapper">
      <template v-for="(group, idx) in settingCol">
        <div class="setting-group" :key="idx">
          <div class="group-name">{{ group.name }}</div>
          <div class="group-wrapper">
            <template v-for="(item, idx) in group.value">
              <div class="group-item" :key="idx">
                <div class="item-name">{{item.name}}</div>
                <select class="item-select" v-if="item.value === 'timezone'" v-model="configValue[item.value]">
                  <template v-for="(zone, idx) in timezones">
                    <optgroup :label="zone.name" :key="idx">
                      <template v-for="(time, idx) in zone.zones">
                        <option :value="time" :key="idx" selected v-if="configValue[item.value] == time" >{{time}}</option>
                        <option :value="time" :key="idx" v-else>{{time}}</option>
                      </template>
                    </optgroup>
                  </template>
                </select>
                <input v-model="configValue[item.value]" v-else>
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
    <footer class="footer">
      <div class="platform" >System: {{platform}}</div>
      <div class="version" >Ver.{{version}}</div>
    </footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { State } from 'vuex-class'
import FileSys from '../../libs/FileSys'
import HexoSys from '../../libs/HexoSys'
import SimpleConf from './config/simple'
import Timezones from './config/timezone'

@Component
export default class Setting extends Vue {

  @State(state => state.App.blogPath) _path

  version: string = FileSys.readYml('/config/default.yml').version
  platform: string = require('os').platform() === 'darwin' ? 'MacOS' : require('os').platform()

  configValue: any = {}

  get settingCol() {
    return SimpleConf
  }

  get timezones() {
    return Timezones
  }

  created () {
    this.configValue = Object.assign({}, HexoSys.readConfig(this._path[0]))
  }

}
</script>

<style lang="stylus" scoped>
.app-settings
  box-sizing border-box
  .header
    padding 32px
    .header-title
      font-size 1.4em
    .header-desc
      font-size 12px
      color #737373
  .settings-wrapper
    padding 0 32px
    .setting-group
      margin-bottom 16px
      .group-name
        font-size 16px
        margin 8px 0
      .group-wrapper
        .group-item
          margin 8px 0
          .item-name
            font-size 12px
  .footer
    position absolute
    bottom 0
    right 0
    margin 2px 8px
    .platform
    .version
      display inline-block
      font-size 10px
      color #666
      font-family 'PingFang SC', Helvetica, sans-serif
      font-weight 100
</style>
