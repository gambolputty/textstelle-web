<template>
  <div class="container">
    <div>
      <NuxtLink to="de/Substantive">
        de/Substantive
      </NuxtLink>

      <div class="links">
        <!-- <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          GitHub
        </a> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import { Octokit } from '@octokit/rest'

export default Vue.extend({
  // async asyncData () {
  //   const octokit = new Octokit({
  //     auth: 'de13e00ebb986e404d47abfceaeb8ba7e546091f'
  //   })

  //   const { data } = await octokit.request('GET /repos/gambolputty/textstelle/contents/de')
  //   console.warn(data.length)

  //   return { data }
  // }
})
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
