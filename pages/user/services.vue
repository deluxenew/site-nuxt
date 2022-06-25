<template>
  <div>
    Мои Услуги
  </div>
</template>

<script>
  export default {
    name: "services",
    middleware: 'isAuth',
    layout: 'personal',
    transition: 'bounce-fast'
  }
</script>
