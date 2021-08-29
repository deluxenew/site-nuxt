<template>
  <page-view :sections="sections">
    <div :slot="sections[0].slotName">123123</div>
  </page-view>
</template>

<script>
import PageView from "../components/views/PageView";

export default {
  name: "IndexPage",
  components: {PageView},
  data() {
    return {
      sections: [
        {
          title: 'Первый экран',
          slotName: 'one',
        },
        {
          title: 'Второй экран',
          slotName: 'two',
        },
        {
          title: 'Третий экран',
          slotName: 'tree',
        },
        {
          title: 'Четвертый экран',
          slotName: 'four',
        }]
    }
  },
}
</script>

<style scoped>

</style>
