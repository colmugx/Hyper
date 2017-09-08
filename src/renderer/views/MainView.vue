<template>
  <div class="main-view">
    <sidebar @change="handleChange" ref="sidebar" />
    <router-view :style="styles"></router-view>
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

  @Mutation('TITLE') setTitle

  handleChange(url) {
    this.$router.push({ path: url })
  }

  created() {
    this.setTitle('文章列表')
  }

  get styles() {
    return {
      marginLeft: '60px'
    }
  }

}
</script>


<style lang="stylus" scoped>

</style>
