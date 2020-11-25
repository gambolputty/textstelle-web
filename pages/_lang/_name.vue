<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        textstelle-web
      </h1>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Octokit } from '@octokit/rest'

const octokit = new Octokit({
  auth: process.env.GITHUB_SECRET
})

export default Vue.extend({
  async asyncData ({ params }) {
    const { lang, name } = params

    const { data } = await octokit.request(`GET /repos/gambolputty/textstelle/contents/${lang}/${name}`)
    console.warn(data)

    return { data }
  }
})
</script>

<style>

</style>
