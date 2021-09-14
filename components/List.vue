<template lang="pug">
  .list
    .listitem(
      v-for='(entry, index) in entries'
      :key='entry.slug'
      :class="{ 'listitem--selected': selectedIndex >= 0 && selectedIndex === index }"
    )
      .listitem__icon
        font-awesome-icon.icon--dir(
          v-if="entry.type === 'dir'"
          :icon="['far', 'folder']"
        )
        font-awesome-icon.icon--file(
          v-else-if="entry.type === 'file'"
          :icon="['far', 'file']"
        )
      .listitem__label
        NuxtLink.listitem__link(
          v-if="entry.type === 'dir'"
          :to="entry.slug"
        ) {{ entry.name }}
        a.listitem__link(
          v-else-if="entry.type === 'file'"
          :href='entry.downloadUrl'
          download=''
          rel='noopener'
        ) {{ entry.name }}
        span.listitem__lang(
          v-if='!isSubdir'
        ) {{ entry.lang }}

      template(v-if="entry.type === 'file'")
        .listitem__size {{ $formatBytes(entry.size) }}
        .listitem__download
          Button(
            :primary='true'
            :icon="isPreparingDownload === true ? ['fas', 'spinner'] : null"
            :pulse='isPreparingDownload === true ? true : false'
            @click.native='download(entry.name, entry.downloadUrl)'
          ) Download

</template>

<script lang="ts">
import Vue from 'vue'
import FileSaver from 'file-saver'

export default Vue.extend({
  name: 'List',

  props: {
    entries: {
      type: Array,
      default: () => []
    },
    isSubdir: {
      type: Boolean,
      default: false
    },
    selectedIndex: {
      type: Number,
      default: -1
    }
  },

  data () {
    return {
      isPreparingDownload: false
    }
  },

  mounted () {
    console.warn(this.entries)
  },

  methods: {

    async download (filename: string, downloadUrl: string) {
      this.isPreparingDownload = true
      const response = await this.$axios.get(downloadUrl, { responseType: 'blob' })
      this.isPreparingDownload = false
      FileSaver.saveAs(new Blob([response.data]), filename)
    }
  }
})
</script>

<style lang="scss">

.list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
}

.listitem {
  width: 98%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: nowrap;
  align-items: center;
  align-content: flex-start;
  //background-color: #fafafa;
  border-bottom: 1px solid #eee;
  padding: $line_height/3 + rem 0;
  @include userselect-off;
  &:last-child {
    border-bottom: none;
  }
  @media only screen and (max-width: $break1) {
    //align-items: flex-start;
    //flex-direction: column;
  }
  &--selected {
    background-color: $light_grey;
  }
  &__icon {
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    width: rem(31.5px);
    margin-right: $list_icon_margin_right;
  }
  &__label {
    display: flex;
    flex-grow: 4;
    text-overflow: ellipsis;
    /* Required for text-overflow to do anything */
    white-space: nowrap;
    overflow: hidden;
  }
  &__link {
    color: $black;
    text-decoration: none;
    &:hover {
      //color: $blue
    }
  }
  &__lang {
    margin-left: .3rem;
    font-size: $fontsize_tiny;
    line-height: $fontsize_tiny;
    align-self: flex-start;
    // background-color: $light_grey;
    color: $medium_grey;
    font-weight: 700;
    letter-spacing: .05rem;
    // border: 1px solid $medium_grey;
    // border-radius: 3px;
    padding: .11rem .18rem;
    text-transform: uppercase;
  }
  &__size {
    flex-grow: 2;
    white-space: nowrap;
    margin-left: 1rem;
    text-align: right;
  }
  &__download {
    margin-left: 1rem;
    @media only screen and (max-width: $break1) {
      display: none;
    }
  }
}
</style>
