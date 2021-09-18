<template>
  <div class="welcome-block">
    <h1 class="title">
      {{ title }}
    </h1>
    <div class="flex">
      <ui-block
        :verticalGrow="3 / 2"
        :horizontalGrow="3"
        title="Персональная информация"

      >

      </ui-block>
      <ui-block
        :verticalGrow="3 / 2"
        :horizontalGrow="3 / 2"
        title="Статистика"
      >
        asdadasd
      </ui-block>
      <ui-block
        :verticalGrow="3"
        :horizontalGrow="1"
        title="Достижения"
      >
        asdadasd
      </ui-block>
    </div>
  </div>
</template>

<script>
import TabsComponent from "../contentComponents/TabsComponent";
import UiBlock from "../reuse/UiBlock";

export default {
  name: "WelcomeBlock",
  props: {
    title: {
      type: String,
      default: 'Строительство домов'
    }
  },
  components: {
    UiBlock,
    TabsComponent
  }
}
</script>

<style lang="scss" scoped>
.welcome-block {
  width: 100%;
  height: 100%;
  padding: $mediumPadding 0;

  @media (max-width: 800px) {
    padding: 32px 0;
  }

  .flex {
    padding-top: 16px;
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  .title {
    color: $default;
    font-size: $h3;
    text-align: center;
  }
}
</style>
