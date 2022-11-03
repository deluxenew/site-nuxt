<template>
  <transition :name="animationName">
    <div
      v-if="show"
      class="dropdown"
      :style="{
        top: `${customStyle.top}px`,
        height: `${customStyle.height}px`,
        right: `${customStyle.right}px`,
        left: `${customStyle.left}px`
      }"
    >
      <slot/>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "DropDown",
    props: {
      customStyle: {
        type: Object,
        default: () => ({
          top: 0,
          height: 0,
        }),
      },
      animationName: {
        type: String,
        default: 'slide-top'
      },
      show: {
        type: Boolean,
        default: false,
      }
    },
  }
</script>
