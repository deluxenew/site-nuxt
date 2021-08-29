<template>
  <div class="welcome-block">
      <h1 class="title">
        Строительство домов
      </h1>
    <tabs-component/>
  </div>
</template>

<script>
import TabsComponent from "../contentComponents/TabsComponent";
export default {
  name: "WelcomeBlock",
  components: {
    TabsComponent
  }
}
</script>

<style lang="scss" scoped>
.welcome-block {
  width: 100%;
  height: 100%;
  padding: $largePadding 0;
  //background-image: url('/images/bg2.png');
  //background-size: auto auto;
  //background-position: center top;
  //background-repeat: repeat-y;

  .title {
    color: $default;
    font-size: $h2;
    text-align: center;
  }
}
</style>
