<template>
  <component :is="template" :sections="sections">
    <div class="homepage" v-for="section in sections" :slot="section.slotName" :key="section.slotName">
      <component
        v-for="component in Object.keys(blockComponents[section.slotName][0].componentsProps || {})"
        :key="JSON.stringify(component)"
        :is="component"
        v-bind="section.componentsProps[component]"
      />
    </div>
  </component>
</template>

<script>
import { views } from "~/constants/views";
const { content: { components: content }, pageTemplates: { components: templates }} = views
const components = { ...content, ...templates }

export default {
  name: "IndexPage",
  components,
  data() {
    return {
      // ret: components,
      template: 'PageView',
      sections: [
        {
          navTitle: 'Главная',
          slotName: 'one',
          componentsProps: {
            WelcomeBlock: {},
          }
        },
        {
          navTitle: 'Проекты',
          slotName: 'two',
        },
        {
          navTitle: 'Услуги',
          slotName: 'tree',
          componentsProps: {
          }
        },
        {
          navTitle: 'Компании',
          slotName: 'four',
          componentsProps: {
            test: {},
          }
        },
        {
          navTitle: 'Инфо',
          slotName: 'five',
          componentsProps: {
            test: {},
          }
        }]
    }
  },
  computed: {
    blockComponents() {
      return this.$utils.groupBy(this.sections, 'slotName')
    }
  },
}
</script>

<style lang="scss" scoped>
.homepage {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
