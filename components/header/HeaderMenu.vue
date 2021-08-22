<template>
  <div class="top-menu">
    <div class="title">
      Главное меню
    </div>
    <ul class="menu">
      <nuxt-link
        v-for="item in items"
        :key="item.id"
        :to="item"
        class="menu-item"
        @click.native="$emit('close'), event => event.preventDefault()"
      >
        {{ item.title }}
      </nuxt-link>
    </ul>
  </div>
</template>

<script>
import { topMenu } from "../../constants/topMenu";

export default {
  name: "HeaderMenu",
  props: {
  },
  data() {
    return {
      items: topMenu,
    }
  }
}
</script>

<style lang="scss" scoped>
.top-menu {
  padding: 32px;
  min-width: 50vw;

  .title {
    font-size: 4vw;
    line-height: normal;
    margin-bottom: 40px;
    font-weight: 700;
    text-align: center;
    color: $default;
    width: 100%;
  }
}

.menu {

}

.menu-item {
  color: $default;
}

</style>
