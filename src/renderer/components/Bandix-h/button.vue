<template>
  <button class="band-button" :class="size" v-text="label">
  </button>
</template>

<script lang="ts">
export default {
  name: 'bd-button',
  props: {
    label: String,
    size: {
      type: String,
      default: 'normal',
      validator(val) {
        return [
          'tiny',
          'normal'
        ].indexOf(val) > -1
      }
    }
  }
}
</script>


<style lang="stylus" scoped>
.band-button
  outline none
  -webkit-user-select none
  cursor pointer
  background-color transparent
  padding 4px 8px
  border 1px solid #999
  border-radius 6px
  width: 100px
  color #666
  font-size 12px
  text-align center
  font-weight 400
  transition transform .1s, text-shadow .3s, border-color .3s
  &:hover
    text-shadow 1px 1px 2px #dddcdc
    border-color #6e6e6e
  &:active
    transform scale(0.95)
  &.tiny
    width 80px
</style>

