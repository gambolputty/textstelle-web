<template lang="pug">
  button(:class='classList')
    font-awesome-icon.icon.button__icon(v-if='icon' :icon='icon' :pulse='pulse ? pulse : false')
    span.button__text
      slot Button

</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Button',
  props: {
    primary: {
      type: Boolean,
      required: false
    },
    icon: {
      type: Array,
      required: false,
      default: null
    },
    pulse: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    classList () {
      const list = ['button']
      if (this.primary) {
        list.push('button--primary')
      }
      if (this.icon) {
        list.push('button--with-icon')
      }
      return list
    }

  }
})
</script>

<style lang="scss">
.button {
  $padding_v: 0;
  $padding_h: .6rem;
  display: inline-block;
  vertical-align: middle;
  color: $black;
  font-size: $fontsize_smaller;
  letter-spacing: .04rem;
  line-height: rem(32px);
  height: rem(32px);
  text-decoration: none;
  font-weight: 700;
  margin: 0;
  padding: $padding_v $padding_h;
  border: 0;
  background-color: $light_grey;
  border-radius: 3px;
  box-sizing: border-box;
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: $grey;
  }
  @include userselect-off;
  &--primary {
    background-color: $black;
    color: white;
    &:hover {
      background-color: $grey;
      color: $black;
    }
  }
  &--with-icon {
    padding: $padding_v $padding_h $padding_v 0;
  }
  &__text {
    text-transform: uppercase;
  }
  &__icon {
    vertical-align: -.3rem;
    margin: 0 .5rem;
    font-size: rem(21px);
  }
  .fa-spinner.fa-pulse {
    font-size: rem(16px);
    vertical-align: -.2rem
  }
}
</style>
