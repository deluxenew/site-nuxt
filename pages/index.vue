<template>
  <component :is="template" :sections="sections">
    <div class="w-full h-full" v-for="section in sections" :slot="section.slotName" :key="section.slotName">
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
  transition: 'bounce-fast',
  data() {
    return {
      // ret: components,
      template: 'SingleScreen',
      sections: [
        {
          navTitle: 'Главная',
          slotName: 'one',
          componentsProps: {
            WelcomeBlock: {
              title: 'Пользователь',
              blocks: [
                {
                  id: 'info',
                  verticalGrow: 1,
                  horizontalGrow: 3,
                  title: "Информация",
                  description: "Персональная информация пользователя с возможностью редактирования",
                  component: 'UserInfo'
                },
                {
                  id: 'stat',
                  verticalGrow: 1,
                  horizontalGrow: 3 / 2,
                  title: "Статистика",
                }]
            },
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

          }
        },
        {
          navTitle: 'Инфо',
          slotName: 'five',
          componentsProps: {

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

