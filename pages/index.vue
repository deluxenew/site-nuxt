<template>
  <page-view :sections="sections">
    <div class="view-block" :slot="sections[0].slotName">
      <welcome-block />
    </div>
    <div :slot="sections[1].slotName">2</div>
    <div :slot="sections[2].slotName">3</div>
    <div :slot="sections[3].slotName">4</div>
  </page-view>
</template>

<script>
import PageView from "../components/views/PageView";
import WelcomeBlock from "../components/viewBoxes/WelcomeBlock";

export default {
  name: "IndexPage",
  components: {
    WelcomeBlock,
    PageView
  },
  data() {
    return {
      sections: [
        {
          navTitle: 'Приветствие',
          slotName: 'one',
        },
        {
          navTitle: 'Второй экран',
          slotName: 'two',
        },
        {
          navTitle: 'Третий экран',
          slotName: 'tree',
        },
        {
          navTitle: 'Четвертый экран',
          slotName: 'four',
        }]
    }
  },
}
</script>

<style lang="scss" scoped>
.view-block {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
