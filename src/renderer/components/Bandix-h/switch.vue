<template>
  <label class="band-switch">
    <input type="checkbox" :disabled="disabled" class="band-switch-input" v-model="currentValue">
    <span class="band-switch-body"></span>
  </label>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"

@Component
export default class Switch extends Vue {

  @Prop()
  value: string
  @Prop()
  disabled: string

  get currentValue() {
    return this.value
  }

  set currentValue(val) {
    this.$emit('change', val)
    this.$emit('input', val)
  }
}
</script>

<style lang="stylus" scoped>
.band-switch
  position relative
  display flex
  flex-direction row
  align-items center

  .band-switch-input
    display none
    &:checked + .band-switch-body:before
      background-color #666
      width 20px
    &:checked + .band-switch-body:after
      transform translateX(20px)

  .band-switch-body
    position relative
    width 26px
    height 2px
    box-sizing border-box
    background-color #bbb
    *
      pointer-events none
    &:before
    &:after
      content ''
      position absolute
      top 0px
      left 0
      transition transform .3s, width .3s, background-color .3s
      border-radius 15px
      width 0px
      height 2px
      background-color #fdfdfd
    &:after
      top -6px
      left -4px
      background-color #666
      width 15px
      height @width
      box-shadow: 0px 1px 3px rgba(0, 0, 0, .4)
</style>

