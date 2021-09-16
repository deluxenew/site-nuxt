<template>
  <div>
    Моя компания
  </div>
</template>

<script>

export default {
  name: "company",
  layout: (ctx) => {
    if (!ctx.$auth.user) return 'noAccess'
    else return 'personal'
  },
  transition: 'bounce-fast'
}
</script>

<style scoped>

</style>
