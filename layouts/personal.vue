<template>
  <div class="personal-layout">
    <nuxt/>
  </div>
</template>

<script>
export default {
  name: "personal",
  mounted() {
    this.$auth.$storage.watchState('loggedIn', isLogin => {
      if (isLogin) {
        console.log('loggedIn')
      } else {
        console.log('not loggedIn')
      }
    });
  },
}
</script>

<style scoped>

</style>
