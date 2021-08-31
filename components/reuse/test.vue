<template>
  <div>
    <div class="title">
      {{ title }}
    </div>
    <img src="/images/1.webp" alt="vddpisjfhdspif fewfkwef" :width="width" :height="height">
  </div>
</template>

<script>
export default {
  name: "test",
  props: {
    title: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 1600
    },
    height: {
      type: Number,
      default: 1200
    },
  },
}
</script>

<style scoped>

</style>
