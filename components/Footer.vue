<template lang="pug">
  .footer
    a.github-link(
      href='https://github.com/gambolputty/textstelle'
      target='_blank'
      rel='noopener noreferrer'
    )
      font-awesome-icon.icon--github(:icon="['fab', 'github']")
      span.github-link__text Textstelle on GitHub

</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Footer'
})
</script>

<style lang="scss">
.footer {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.github-link {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-content: flex-start;
  color: $medium_grey;
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  &__text { font-size: $fontsize_small; }
  .icon--github {
    font-size: rem(20px);
    margin-right: .25rem;
  }
}

</style>
