<template>
  <div class="main-view">
    <sidebar @change="handleChange" ref="sidebar" />
    <div :style="[styles, {height: currentHeight + 'px'}]">
      <router-view ></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue,  Component} from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
import Sidebar from '../components/common/Sidebar'

@Component({
  components: {
    Sidebar
  }
})
export default class MainView extends Vue {

  marginLeft: string
  currentHeight: Number = 0

  handleChange(url) {
    this.$router.push({ path: url })
  }

  mounted () {
    this.currentHeight = document.body.clientHeight - 22
  }

  get styles() {
    return {
      marginLeft: '60px',
      overflow: 'auto'
    }
  }

}
</script>


<style lang="stylus" scoped>

</style>
