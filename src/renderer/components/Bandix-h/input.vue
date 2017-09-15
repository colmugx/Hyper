<template>
  <div class="band-input">
    <div class="band-input-name">{{name}}</div>
    <input class="band-input-value" v-model="currentValue">
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class Input extends Vue {

  @Prop()
  value: String
  @Prop()
  name: String

  get currentValue() {
    return this.value
  }

  set currentValue(val) {
    this.$emit('input', val)
  }
}
</script>


<style lang="stylus" scoped>
@import '../../styles/_mixins.styl'
.band-input
  .band-input-name
    font-size 12px
    font-weight 100
  .band-input-value
    outline none
    -webkit-appearance none
    border none
    border-line(bottom, #777)
    width 300px
    padding 4px 8px
    padding-bottom 6px
    font-size 12px
</style>
