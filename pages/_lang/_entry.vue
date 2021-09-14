<template lang="pug">
  div
    Button(@click.native='goBack' :icon="['fas', 'caret-left']") Back
    .entry
      .entry__head
        font-awesome-icon.icon--dir(:icon="['far', 'folder-open']")
        h2 {{ name }}
      List(
        :entries='files'
        :isSubdir='true'
      )
      .readme(v-if='readme' v-html='readme')

</template>

<script lang="ts">
import { IContentDocument } from '@nuxt/content/types/content'
import Vue from 'vue'

export default Vue.extend({
  async asyncData ({ from, params, $content, error }) {
    const { lang, entry: name } = params
    // const path = `${lang}/${encodeURIComponent(name)}`
    const [document] = await $content('entries')
      .where({ lang, name })
      .fetch<IContentDocument[]>()
      .catch(() => {
        error({ statusCode: 404, message: 'Document not found' })
      }) as IContentDocument[]

    const { readme, files } = document
    console.warn('test', { readme, files })

    return {
      name, readme, files, referSameSite: from !== null
    }
  },

  data () {
    return {
      name: 'Unknown',
      readme: '',
      files: [],
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
  },

  head (): Object {
    return {
      title: this.name,
      titleTemplate: '%s | ' + this.$config.siteTitle
    }
  }
})
</script>

<style lang="scss">
.entry {
  background-color: #fff;
  &__head {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: nowrap;
    align-items: center;
    align-content: flex-start;
    border-bottom: 1px solid #ddd;
    margin-top: $line_height/2 + rem;
    .icon--dir {
      margin-right: $list_icon_margin_right;
      width: 1.75rem;
    }
  }
}

.readme {
  border: 1px solid #ddd;
  margin-top: $line_height/2 + rem;
  padding: .5rem 1rem;
  //border-radius: 4px;
  //box-shadow: 0 0px 4px 0 rgba(39, 39, 39, 0.15);
}

</style>
