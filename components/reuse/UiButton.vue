<template>
  <button class="ui-button" @click="$emit('click')" :disabled="loading || disabled">
    <transition name="bounce-fast" mode="out-in">
      <ui-loader class="loader" v-if="loading"/>
      <template v-else>
        <span class="text">
           {{ text }}
        </span>
      </template>
    </transition>
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
    }
  },
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
  background-color: rgba($green, 0.5);
  transition: $trs;

  &:hover:not(:disabled) {
    background-color: $green;
    color: $white;
  }

  &:disabled {
    cursor: not-allowed;
  }

  .text {
    font-size: 16px;
    line-height: 20px;
    text-align: center;
  }

  .loader {
    position: absolute;
    top: calc(50% - 16px);
    left: calc(50% - 16px);
  }
}
</style>
