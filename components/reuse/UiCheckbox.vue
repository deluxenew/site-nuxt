<template lang="pug">
div.flex.cursor-pointer.p-2(
  @click="setClick"
)
  div.p-1.flex.align-center.justify-center.w-24.h-24
    fa-icon(:icon="['fab', 'check']" swapOpacity border :style="stylesIcon")
  div {{label}}
</template>

<script>
  export default {
    name: "UiCheckbox",
    props: {
      value: {
        type: Boolean,
        default: false,
      },
      label: {
        type: String,
        default: ""
      },
    },
    computed: {
      stylesIcon() {
        return {
          color: this.value ? "#4dce00" : "#1b1b1b"
        }
      }
    },
    methods: {
      setClick() {
        this.$emit("input", !this.value)
      }
    }
  }
</script>
