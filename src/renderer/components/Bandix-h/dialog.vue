<template>
  <transition name="dialog-fade">
    <div class="dialog" v-show="visible">
      <div class="dialog-mark" @click.self="handleMark"></div>
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
  visible: Boolean

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
.dialog
  position relative
  .dialog-mark
    position fixed
    width 100%
    max-height 100%
    height calc(100vh - 22px)
    padding-top 32px
    padding-left 200px
    z-index 2000
  .dialog-wrapper
    position absolute
    top 50%
    left 50%
    z-index 2001
    transform translateX(-50%)
    box-shadow 0px 1px 2px 0px #c5c5c5
    min-width 300px
    padding 16px
    box-sizing border-box

.dialog-fade-enter-active,
.dialog-fade-leave-active
  transition all .3s ease

.dialog-fade-enter,
.dialog-fade-leave-to
  transform translateY(-60px)
  opacity 0

</style>
