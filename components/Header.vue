<template lang="pug">
  header(role='banner' v-if="showHeader")
    h1
      NuxtLink.h1-link(to='/') {{ $config.siteTitle }}
    p
      | {{ $config.siteDescription }}
      | More information about this project (e.g. how to submit material) can be found
      =' '
      NuxtLink(to='/about') here
      | .

</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  computed: {
    showHeader () {
      return this.$route.name ? ['index', 'lang-entry'].includes(this.$route.name) : true
    }
  }
})
</script>

<style lang="scss">
.h1-link {
  color: $black;
}
</style>
