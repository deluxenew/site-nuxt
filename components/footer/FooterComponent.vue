<template>
  <footer class="footer" :class="{ active: openFooter }">
    <div class="hover-line" @click="getFooter">
      <fa-icon class="icon-bottom" :icon="['fac', 'arrowHeader']"/>
      <fa-icon class="icon-chevron" :class="{ opened: openFooter }" :icon="['fac', 'chevronDown']"/>
    </div>
  </footer>
</template>

<script>
  export default {
    name: "FooterComponent",
    data() {
      return {
        openFooter: false
      }
    },
    methods: {
      getFooter() {
        this.openFooter = !this.openFooter
      }
    },
  }
</script>
