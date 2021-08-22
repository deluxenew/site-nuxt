<template>
  <div
    class="dropdown"
    :style="{top: `${customStyle.top}px`, height: `${customStyle.height}px`}"
  >
    <slot/>
  </div>
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
    }
  },
}
</script>

<style lang="scss" scoped>
.dropdown {
  position: absolute;
  left: 0;
  width: 100vw;
  padding: 24px;
  z-index: 0;
}
</style>
