<template>
  <div class="welcome-block">
      <h1 class="title">
        {{title}}
      </h1>
    <tabs-component />
  </div>
</template>

<script>
import TabsComponent from "../contentComponents/TabsComponent";

export default {
  name: "WelcomeBlock",
  props: {
    title: {
      type: String,
      default: 'Строительство домов'
    }
  },
  components: {
    TabsComponent
  }
}
</script>

<style lang="scss" scoped>
.welcome-block {
  width: 100%;
  height: 100%;
  padding: $smallPadding 0;

  .title {
    color: $default;
    font-size: $h3;
    text-align: center;
  }
}
</style>
