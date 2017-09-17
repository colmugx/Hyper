<template>
  <transition name="dialog-fade">
    <div class="confirm" v-show="visible" @click.self="handleMark">
      <div class="confirm-wrapper">
        <span class="confirm-label" v-text="label"></span>
        <div class="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator'

@Component
export default class Confirm extends Vue {

  @Prop()
  visible: boolean
  @Prop()
  label: string

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
@import './styles/confirm.styl'

.footer
  text-align right
  margin-top 16px
</style>
