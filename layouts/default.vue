<template>
  <div class="layout-wrapper">
    <header-component />

    <div class="content">
      <nuxt/>
    </div>

    <footer-component />
  </div>
</template>

<script>
import FooterComponent from "../components/footer/FooterComponent";
export default {
  name: "default",
  components: {FooterComponent},
  methods: {
    onScroll(e) {
      console.log(e)
    },
  },
  mounted() {
    document.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.onScroll)
  }
}
</script>

<style lang="scss" scoped>
.layout-wrapper {

}

.content {
  width: 100vw;
  padding-top: 56px;
  height: 100vh;
  overflow-y: auto;
}
</style>
