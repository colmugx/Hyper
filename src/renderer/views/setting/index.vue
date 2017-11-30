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
                <div class="item-check" v-else-if="item.value === 'highlight'">
                  <span>{{configValue[item.value].enable ? '启' : '禁'}}用</span>
                  <bd-switch v-model="configValue[item.value].enable"></bd-switch>
                </div>
                <input class="item-input" v-model="configValue[item.value].repo" v-else-if="item.value === 'deploy'">
                <input class="item-input" v-model="configValue[item.value]" v-else>
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
    <div class="submit-group">
      <bd-button @click.native="confirmUpd()" label="确认修改"></bd-button>
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
import { ipcRenderer } from 'electron'
import FileSys from '../../../libs/FileSys'
import HexoSys from '../../../libs/HexoSys'
import SimpleConf from './config/simple'
import Timezones from './config/timezone'
import bdSwitch from '../../components/Bandix-h/switch.vue'
import bdButton from '../../components/Bandix-h/button.vue'

@Component({
  components: {
    bdSwitch,
    bdButton
  }
})
export default class Setting extends Vue {

  @State(state => state.App.blogPath) _path

  version: string = (ipcRenderer.sendSync('ReadConf')).version
  platform: string = require('os').platform() === 'darwin' ? 'MacOS' : require('os').platform()

  configValue: any = {}

  get settingCol() {
    return SimpleConf
  }

  get timezones() {
    return Timezones
  }

  created() {
    this.configValue = Object.assign({}, HexoSys.readConfig(this._path))
  }

  confirmUpd() {
    console.log('commit')
  }

}
</script>

<style lang="stylus" scoped>
@import '../../styles/_partial/settings.styl'
</style>
