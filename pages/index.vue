<template lang="pug">
  div
    //- Filterpanel
    .filterpanel
      .filterpanel__head Filter:
      .filterpanel__opt
        Switcher.filterpanel__value(
          label='German'
          :checked='filter.lang == "de"'
          @click.native='switchClick({ filterLang: "de" })'
        )
        Switcher.filterpanel__value(
          label='English'
          :checked='filter.lang == "en"'
          @click.native='switchClick({ filterLang: "en" })'
        )

    //- Searchform
    form.searchform(
      @submit.prevent='onSubmit'
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

    //- List entries
    List(
      :entries='computedEntries'
      :isSubdir='false'
      :selectedIndex='selectorPos'
    )
    p(v-if='searchQuery.length && computedEntries.length === 0')
      | No entries found for "{{searchQuery}}"

</template>

<script lang="ts">
import { IContentDocument } from '@nuxt/content/types/content'
import Vue from 'vue'

export default Vue.extend({
  name: 'Index',

  async asyncData ({ $content }) {
    const entries = await $content('entries')
      .only(['lang', 'type', 'name', 'slug'])
      .fetch<IContentDocument[]>()
    return { entries }
  },

  data () {
    return {
      entries: [],
      filter: { lang: null },
      searchQuery: '',
      selectorPos: -1
    }
  },

  computed: {
    computedEntries (): IndexEntry[] {
      const result = []
      const entries = this.entries
      const filter = this.filter

      for (let i = 0, l = entries.length; i < l; i++) {
        const entry: IndexEntry = entries[i]
        if (filter.lang && filter.lang !== entry.lang) {
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
    this.updateFilter()
  },

  methods: {

    updateFilter () {
      const route = this.$route
      const filter: IndexFilter = this.filter

      if (route.query.lang !== null && typeof route.query.lang === 'string') {
        const queryLang = route.query.lang
        if (['de', 'en'].includes(queryLang)) {
          filter.lang = queryLang
        }
      }
    },

    switchClick ({ filterLang }: { filterLang: string }): void {
      const filter: IndexFilter = this.filter
      let routeParam = {}

      filter.lang = typeof filter.lang === 'string' && filter.lang === filterLang ? null : filterLang
      routeParam = filter.lang ? { lang: filter.lang } : {}

      this.$router.replace({ query: routeParam })
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
          this.$router.push(entry.slug)
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
