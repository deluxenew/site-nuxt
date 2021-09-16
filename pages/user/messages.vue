<template>
<div>
  Сообщения
</div>
</template>

<script>
export default {
  name: "messages",
  layout: (ctx) => {
    if (!ctx.$auth.user) return 'noAccess'
    else return 'personal'
  },
  transition: 'bounce-fast'
}
</script>

<style scoped>

</style>
