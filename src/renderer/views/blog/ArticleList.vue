<template>
  <div>
  </div>
</template>

<script lang="ts">
import { Vue,  Component} from 'vue-property-decorator'
import { Mutation } from 'vuex-class'

@Component
export default class ArticleList extends Vue {

@Mutation('TITLE') setTitle

created () {
  this.setTitle('文章列表')
}

}
</script>


<style lang="stylus" scoped>

</style>
