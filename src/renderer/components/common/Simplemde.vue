<template>
  <div class="markdown-editor">
    <textarea id="markdown"></textarea>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import simplemde from 'simplemde'
import highlight from 'highlight.js'

@Component
export default class Simplemde extends Vue {

  @Prop()
  value: any
  @Prop({
    default: true
  })
  highlight: Boolean

  simplemde: any = null

  mounted() {
    let config: any = {
      element: this.$el.firstElementChild,
      renderingConfig: {},
      initialValue: this.value,
      indentWithTabs: false
    }

    if (this.highlight) {
      config.renderingConfig.codeSyntaxHighlighting = true
      this.upHighLight()
    }

    this.simplemde = new simplemde(config)

    this.simplemde.codemirror.on('change', () => {
      this.$emit('input', this.simplemde.value())
    })
  }

  upHighLight() {
    window['hljs'] = highlight
  }

  destroyed() {
    this.simplemde = null
  }

  @Watch('value')
  onChangeValue(val: any) {
    if (val === this.simplemde.value()) return
    this.simplemde.value(val)
  }

}
</script>

<style>
@import url('/node_modules/simplemde/dist/simplemde.min.css');
@import url('/node_modules/highlight.js/styles/color-brewer.css');
a:focus {
  outline: none;
}
.CodeMirror {
  height: calc(100vh - 136px);
}
.fullscreen {
  top: 22px !important;
  position: absolute !important;
}
.CodeMirror-fullscreen {
  top: 72px;
  position: absolute !important;
}

</style>
