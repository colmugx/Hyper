<template>
  <transition name="toast-fade">
    <div class="toast" v-show="visible">
      <div class="toast-wrapper" :class="'toast-color-' + type" @click.self="handleMark">
        <slot>
          <div class="toast-value" v-text="message"></div>
        </slot>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class Toast extends Vue {


  visible: boolean = false
  message: string = ''
  type: string = 'primary'
  timer: any = null

  startTimer() {
    this.timer = setTimeout(() => {
      this.visible = false
    }, 3000)
  }

  destroyElement() {
    this.$el.removeEventListener('transitionend', this.destroyElement)
    this.$destroy()
    this.$el.parentNode.removeChild(this.$el)
  }

  handleMark() {
    clearTimeout(this.timer)
    this.$emit('update:visible', false)
  }

  mounted() {
    this.startTimer()
  }

}
</script>


<style lang="stylus" scoped>
@import '../styles/toast.styl'
</style>
