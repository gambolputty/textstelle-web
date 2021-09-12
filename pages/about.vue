<template lang="pug">
  div
    Button(@click.native='goBack' :icon="['fas', 'caret-left']") Back
    .about-readme(v-html='readmeContent')
</template>

<script lang="ts">
import { IContentDocument } from '@nuxt/content/types/content'
import Vue from 'vue'

export default Vue.extend({
  name: 'About',

  async asyncData ({ from, $content, error }) {
    const document = await $content('about')
      .fetch<IContentDocument>()
      .catch(() => {
        error({ statusCode: 404, message: 'Document not found' })
      }) as IContentDocument

    const { content } = document

    return {
      readmeContent: content,
      referSameSite: from !== null
    }
  },

  data () {
    return {
      referSameSite: false
    }
  },

  methods: {
    goBack () {
      if (this.referSameSite) {
        this.$router.go(-1)
      } else {
        this.$router.push('/')
      }
    }
  }
})
</script>

<style lang="scss">
.about-readme {
  margin-top: $line_height + rem;
}
</style>
