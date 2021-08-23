<template>
  <div>
    <header-component/>
    <div class="wrap">
      <nuxt/>
    </div>
  </div>
</template>

<script>
export default {
  name: "default"
}
</script>

<style lang="scss" scoped>
.wrap {
  width: 100vw;
  padding-top: 56px;
  height: 100vh;
}
</style>
