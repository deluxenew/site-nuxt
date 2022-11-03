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
    components: { UiLoader },
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
