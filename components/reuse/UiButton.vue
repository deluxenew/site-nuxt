<template>
  <button class="ui-button" :class="classes" @click="$emit('click')" :disabled="loading || disabled">
    <transition name="bounce-fast" mode="out-in">
      <ui-loader class="loader" v-if="loading"/>
    </transition>

    <fa-icon class="icon" v-if="iconName" :icon="['fac', iconName]"/>

    <span class="text" :class="{transparent: loading}">
      {{ text }}
    </span>
  </button>
</template>

<script>
import UiLoader from "./UiLoader";

export default {
  name: "UiButton",
  components: {UiLoader},
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ''
    },
    iconName: {
      type: String,
      default: ''
    }
  },
  computed: {
    classes() {
      return {
        'with-icon': this.iconName,
        'transparent': this.loading,
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ui-button + .ui-button {
  margin-left: 16px;
}

.ui-button {
  font-family: 'TTNorms';
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100px;
  height: 48px;
  padding: 0 16px;
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
  background-color: $white;
  transition: $trs;

  &:hover:not(:disabled) {
    background-color: $green;

    .text {
      color: $white;
    }

    .icon path {
      fill: $white;

      &:nth-child(2) {
        fill: $white;
      }
    }

    &:active {
      box-shadow: inset 0 0 8px rgba($default, 0.3);
    }
  }

  &:disabled {
    cursor: not-allowed;
    background-color: rgba($green, 0.2);

    .icon {
      opacity: 0.2;
    }
  }

  .text {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    opacity: 1;
    color: $default;
    transform: scale(1);
    transition: $trs;
  }

  .icon {
    width: 24px;
    height: 24px;
    margin-right: $rate;
    transform: scale(1);
    transition: $trs;

    path {
      fill: $default;
      transition: $trs;

      &:nth-child(2) {
        fill: $green;
      }
    }
  }

  &.with-icon {
    min-width: 132px;
  }

  &.transparent {
    .text, .icon {
      opacity: 0;
      transform: scale(0);
    }
  }

  .loader {
    position: absolute;
    top: calc(50% - 16px);
    left: calc(50% - 16px);
  }
}
</style>
