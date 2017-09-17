<template>
  <transition name="dialog-fade">
    <div class="dialog" v-show="visible" @click.self="handleMark">
      <div class="dialog-wrapper">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class Dialog extends Vue {

  @Prop({
    default: false
  })
  visible: boolean

  @Watch('visible')
  HandleVisible(val) {
    this.$emit('update:visible', val)
  }

  handleMark() {
    this.$emit('update:visible', false)
  }

}
</script>


<style lang="stylus" scoped>
@import './styles/dialog.styl'
</style>
