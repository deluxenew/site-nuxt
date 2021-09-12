<template>
  <div class="layout-wrapper">
    <header-component/>

    <div class="content">
      <nuxt/>
    </div>

    <footer-component/>
  </div>
</template>

<script>
import FooterComponent from "../components/footer/FooterComponent";
import HeaderComponent from "../components/header/HeaderComponent";

export default {
  name: "default",
  components: {FooterComponent, HeaderComponent},
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
  z-index: 0;
}
</style>
