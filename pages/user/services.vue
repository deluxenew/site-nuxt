<template>
<div>
  Мои Услуги
</div>
</template>

<script>
export default {
  name: "services",
  layout: (ctx) => {
    if (!ctx.$auth.user) return 'noAccess'
    else return 'personal'
  },
  transition: 'bounce-fast'
}
</script>

<style scoped>

</style>
