<template>
  <div>

  </div>
</template>

<script>
export default {
  name: 'UserIndexPage',
  layout: (ctx) => {
    if (!ctx.$auth.user) return 'noAccess'
    else return 'personal'
  },
}
</script>

<style scoped>

</style>
