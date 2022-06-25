<template>
<div>
  Мои статьи
</div>
</template>

<script>
export default {
  name: "articles",
  middleware: 'isAuth',
  layout: 'personal',
  transition: 'bounce-fast'
}
</script>

