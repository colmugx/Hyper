<template>
  <div class="markdown-editor">
    <textarea id="markdown"></textarea>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import simplemde from 'simplemde'
import highlight from 'highlight.js'

interface configs {
  element: Element,
  renderingConfig: any,
  initialValue: string,
  spellChecker: boolean,
  indentWithTabs: boolean,
  toolbar: string[]
}

@Component
export default class Simplemde extends Vue {

  @Prop()
  value: any
  @Prop({
    default: true
  })
  highlight: boolean

  simplemde: any = null

  mounted() {
    let config: configs = {
      element: this.$el.firstElementChild,
      renderingConfig: {},
      initialValue: this.value,
      spellChecker: false,
      indentWithTabs: false,
      toolbar: ['bold', 'italic', 'strikethrough', 'heading', '|',
                'quote', 'unordered-list', '|',
                'link', 'image', 'table', '|', 'preview',
                'side-by-side', 'fullscreen', '|', 'clean-block']
    }

    if (this.highlight) {
      config.renderingConfig.codeSyntaxHighlighting = true
      this.upHighLight()
    }

    this.simplemde = new simplemde(config)

    this.simplemde.codemirror.on('change', () => {
      this.$emit('input', this.simplemde.value())
    })

    document.querySelector('.editor-preview-side').className += ' markdown-body'
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
@import url('~simplemde/dist/simplemde.min.css');
@import url('~highlight.js/styles/color-brewer.css');
@import url('../../assets/markdowncss.css');
/* @import url('~github-markdown-css'); */
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
