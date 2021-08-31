<template>
  <page-view :sections="sections">
    <div class="view-block" v-for="section in sections" :slot="section.slotName" :key="section.slotName">
      <component
        v-for="component in Object.keys(blockComponents[section.slotName][0].componentsProps || {})"
        :key="JSON.stringify(component)"
        :is="component"
        v-bind="section.componentsProps[component]"
      />
    </div>
  </page-view>
</template>

<script>
import { views } from "~/constants/views";
const { content: { components }} = views

export default {
  name: "IndexPage",
  components,
  data() {
    return {
      ret: components,
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
          componentsProps: {
            test: {
              title: 'sadasd'
            },
            WelcomeBlock: {},
            PageView: {},
          }
        }]
    }
  },
  computed: {
    blockComponents() {
      const groupBy = (list, key) => {
        return list.reduce(function (rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x)
          return rv
        }, {})
      }
      return groupBy(this.sections, 'slotName')
    }
  },
  methods: {
    getComponentName(section, component) {
      if (section) {
        const sec = this.sections.find((el) => el.slotName === section.slotName)
        if (sec) if (sec.componentsProps && sec.componentsProps.hasOwnProperty(component)) return component
      }
      return ''
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
