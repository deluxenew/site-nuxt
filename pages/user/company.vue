<template>
  <div>
    Моя компания
  </div>
</template>

<script>

export default {
  name: "company",
  middleware: 'isAuth',
  layout: 'personal',
  transition: 'bounce-fast'
}
</script>
