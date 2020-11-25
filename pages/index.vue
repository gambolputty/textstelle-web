<template lang="pug">
  div
    .filterpanel
      .filterpanel__head Filter:
      .filterpanel__opt
        Switcher.filterpanel__value(
          v-model='filter.lang.de'
          label='German'
          @input='switchClick({enSwitch: false})'
        )
        Switcher.filterpanel__value(
          v-model='filter.lang.en'
          label='English'
          @input='switchClick({deSwitch: false})'
        )
    form.searchform(
      v-on:submit.prevent='onSubmit'
    )
      label.searchform__label(for='searchbar') Search:
      input#searchbar.searchform__input(
        type='text'
        v-model='searchQuery'
        maxlength='25'
        autocomplete='off'
        @keydown.down='down'
        @keydown.up='up'
        @keydown.esc="searchQuery=''"
      )
</template>

<script lang="ts">
import Vue from 'vue'
import { ReposGetContentResponseData } from '@octokit/types'

interface Entry {
  lang: string,
  type: string,
  name: string,
  path: string,
  size: number
}

const transformEntry = (lang: string, entry: ReposGetContentResponseData): Entry => ({
  lang,
  type: entry.type,
  name: entry.name,
  path: entry.path,
  size: entry.size
})

export default Vue.extend({
  name: 'Index',

  async asyncData ({ $octokit, route }) {
    const { data: entriesDe } = await $octokit.request('GET /repos/gambolputty/textstelle/contents/de')
    const { data: entriesEn } = await $octokit.request('GET /repos/gambolputty/textstelle/contents/en')
    const entries: Entry[] = entriesDe.map(
      (entry: ReposGetContentResponseData) => transformEntry('de', entry)
    )
      .concat(
        entriesEn.map((entry: ReposGetContentResponseData) => transformEntry('en', entry))
      )

    // update filter
    // const queryLang: string | null = route.query.lang || null
    // if (
    //   queryLang &&
    //   ['de', 'en'].includes(queryLang)) {
    //   vm.filter.lang[to.query.lang] = true
    // }
    return { entries }
  },

  data () {
    const entries: Entry[] = []
    return {
      entries,
      filter: {
        lang: {
          en: false,
          de: false
        }
      },
      searchQuery: '',
      selectorPos: -1
    }
  },

  computed: {
    computedEntries (): Entry[] {
      const result: Entry[] = []
      const entries = this.entries

      for (let i = 0, l = entries.length; i < l; i++) {
        const entry = entries[i]
        if (this.filter.lang.de && entry.lang !== 'de') {
          continue
        }
        if (this.filter.lang.en && entry.lang !== 'en') {
          continue
        }
        if (this.searchQuery.length) {
          // normalize strings (get rid of accents)
          // source: https://stackoverflow.com/a/37511463/5732518
          const foldedName = entry.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036F]/g, '')
          const foldedQuery = this.searchQuery.toLowerCase().normalize('NFD').replace(/[\u0300-\u036F]/g, '')
          if (!foldedName.includes(foldedQuery)) {
            continue
          }
        }
        result.push(entry)
      }
      return result
    }
  },

  mounted () {
    console.warn(this.$formatBytes(21345))
  },

  methods: {
    switchClick ({ deSwitch, enSwitch }: { deSwitch?: boolean, enSwitch?: boolean }): void {
      if (typeof deSwitch !== 'undefined') {
        this.filter.lang.de = deSwitch
      }
      if (typeof enSwitch !== 'undefined') {
        this.filter.lang.en = enSwitch
      }

      let routeParam = {}
      if (this.filter.lang.de) {
        routeParam = {
          lang: 'de'
        }
      } else if (this.filter.lang.en) {
        routeParam = {
          lang: 'en'
        }
      }
      this.$router.replace({
        query: routeParam
      })
    },

    up () {
      if (this.selectorPos > 0) {
        this.selectorPos--
      }
    },

    down () {
      if (this.selectorPos < this.computedEntries.length - 1) {
        this.selectorPos++
      }
    },

    onSubmit () {
      if (this.selectorPos > -1) {
        const entry = this.computedEntries[this.selectorPos]
        if (entry.type === 'dir') {
          this.$router.push({
            path: 'entry',
            query: {
              path: entry.path
            }
          })
        }
      } else {
        this.$forceUpdate()
      }
    }
  }

})
</script>

<style lang="scss">
.filterpanel {
  display: flex;
  flex-direction: row;
  line-height: $line_height*1.3 + rem;
  margin-bottom: $line_height/2 + rem;
  &__head {
    font-weight: 700;
    margin-right: .5rem;
  }
  &__opt {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    &:last-child {
    }
  }
  @media only screen and (max-width: $break1) {
    flex-direction: column;
    &__opt {
      flex-direction: column;
    }
  }
  &__value {
    // flex-basis: 100%;
    margin-right: 1rem;
  }
}

.searchform {
  line-height: $line_height*1.3 + rem;
  margin-bottom: $line_height/2 + rem;
  &__label {
    font-weight: 700;
    margin-right: .1rem;
  }
  &__input {
    line-height: $line_height*1.3 + rem;
    border: 1px solid $medium_grey;
    margin: 0;
    padding: 0 .5rem;
    width: 11rem;
    // border-radius: 3px;
    &:focus {
      outline: none;
      border-color: $black;
    }
  }
}
</style>
