<template lang="pug">
  div
    Button(@click.native='goBack' :icon="['fas', 'caret-left']") Back
    .about-readme(v-html='readmeContent')
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'About',

  async asyncData ({ from, $axios }) {
    const { data: readmeContent } = await $axios.get('/about')
    return {
      readmeContent,
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
