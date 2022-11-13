<template lang="pug">
  div
    div.w-100.header-wrapper.relative(class="bg-[#000000]")
      div.top-menu.flex-row.gap-4
        nuxt-link(class="hover:text-[#aaaaaa]" to="/") На сайт
        nuxt-link(class="hover:text-[#aaaaaa]" to="/admin/") Главная
    transition(name="fade" mode="out-in")
      nuxt
</template>

<script>
  export default {
    name: "admin",
    transition: 'bounce-fast',
  }
</script>
