<template lang="pug">
  div
    Header
    Nuxt(keep-alive)
    Footer
</template>

<script lang="ts">
// import Vue from 'vue'

// export default Vue.extend({
//   mounted () {
//     // console.warn(this.$route)
//   }
// })

</script>

<style lang="scss">
html {
  @include rem-baseline;
  @media only screen and (max-width: $break1) {
    @include rem-baseline(93.8%);
  }
}

[v-cloak], [v-cloak] > * { display: none; }

body {
  font-family: $font1;
  font-size: $fontsize_normal;
  line-height: $line_height;
  color: $black;
  font-weight: 400;
}

h1 {
  font-size: $fontsize_large;
  margin: 0.67rem 0;
}

h2 {
  font-size: $fontsize_medium;
  line-height: $line_height - .3;
  margin: 0.83rem 0;
}

h3 {
  font-size: $fontsize_normal;
  line-height: $line_height - .3;
  margin: 0.83rem 0;
}

p { margin: 0 0 $line_height * 1 + rem; }

blockquote {
  position: relative;
  //color: $dark_grey;
  font-style: italic;
  margin: $line_height + rem 2rem;
  &:before {
    top: -.75rem;
    left: -1.25rem;
    content: '“';
  }
  &:before {
    font-weight: 400;
    font-size: 2rem;
    position: absolute;
  }
  @media only screen and (max-width: $break1) {
    margin-left: 1.25rem;
    margin-right: 1.25rem;
  }
}

// readmes
.markdown-body.entry-content {
  font-family: 'Roboto', sans-serif;
  .anchor { display: none; }
  ul {
    margin: 0;
    padding: 0 1.5rem;
    li {
      line-height: $line_height*1.15 + rem;
      ul {
        padding: 0 1rem;
      }
    }
  }
}

.wrapper {
  max-width: $page_width;
  margin: $line_height * 1.5 + rem auto 0;
  padding: 0 .625rem;
}

.icon {
  font-size: rem(26px);
  &--dir {
    // max-height: 1.8rem;
  }
  &--file {
    // max-height: 1.65rem;
  }
  &--arrow-left {
    // max-height: 1.65rem;
    // width: 1.5rem;
  }
}

a {
  color: $blue;
  text-decoration: none;
}
</style>
