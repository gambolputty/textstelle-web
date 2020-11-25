<template lang="pug">
  label(:class='classNames')
    span.switcher__label
      span {{ label }}
    input(type='checkbox')
    div

</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classNames () {
      const result = ['switcher']
      if (this.checked === false) {
        result.push('switcher--unchecked')
      }
      return result
    }
  }
}
</script>

<style lang="scss">
.switcher {
  $width: 28px;
  $switch-cirle-color-checked: $black;
  $switch-cirle-color-unchecked: $medium_grey;
  $switch-bg-color: $grey;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  &__label {
    display: block;
    font-size: inherit;
    margin-bottom: 0;
    margin-left: .5rem;
    order: 1;
    font-weight: 500;
    text-shadow: 0px 0px 1px $white;
  }

  input {
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    cursor: pointer;
  }

  div {
    height: 15px;
    width: $width;
    position: relative;
    border-radius: 30px;
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    transition: linear 0.15s, background-color linear 0.15s;
    background-color: lighten($switch-bg-color, 5%);

    &:after {
      content: '';
      height: 20px;
      width: 20px;
      border-radius: 100px;
      display: block;
      transition: linear 0.15s, background-color linear 0.15s;
      position: absolute;
      left: 100%;
      margin-left: -18px;
      cursor: pointer;
      top: -3px;
      box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
      background-color: $switch-cirle-color-checked;
    }
  }

  &--unchecked {
    div {
      justify-content: flex-end;
      background-color: $switch-bg-color;

      &:after {
        left: 15px;
        background-color: $switch-cirle-color-unchecked;
      }
    }
  }

  &--disabled {
    div {
      opacity: 0.3;
    }

    input {
      cursor: not-allowed;
    }
  }

  &--bold {
    div {
      top: -8px;
      height: 26px;
      width: 51px;

      &:after {
        margin-left: -24px;
        top: 3px;
      }
    }

    &--unchecked {
      div {
        &:after {
          left: 28px;
        }
      }
    }

    .switcher__label {
      span {
        padding-bottom: 7px;
        display: inline-block;
      }
    }

  }

}

</style>
