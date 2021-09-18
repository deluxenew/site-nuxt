<template>
  <page-view :sections="sections">
    <div class="user-page" v-for="section in sections" :slot="section.slotName" :key="section.slotName">
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
import {views} from "~/constants/views";

const {content: {components: content}, pageTemplates: {components: templates}} = views
const components = {...content, ...templates}

export default {
  name: 'UserIndexPage',
  components,
  transition: 'bounce-fast',
  layout: (ctx) => {
    if (!ctx.$auth.user) return 'noAccess'
    else return 'personal'
  },
  data() {
    return {
      sections: [
        {
          navTitle: 'Общее',
          slotName: 'one',
          componentsProps: {
            WelcomeBlock: {
              title: 'Кабинет пользователя',
              blocks: [
                {
                  id: 'info',
                  verticalGrow: 3 / 2,
                  horizontalGrow: 3,
                  title: "Информация",
                  description: "Персональная информация пользователя с возможностью редактирования",
                  component: 'UserInfo'
                },
                {
                  id: 'stat',
                  verticalGrow: 3 / 2,
                  horizontalGrow: 3 / 2,
                  title: "Статистика",
                },
                {
                  id: 'common',
                  verticalGrow: 3,
                  horizontalGrow: 1,
                  title: "Общее",
                }]
            },
          }
        },
        {
          navTitle: 'Уведомления',
          slotName: 'two',
        },
        {
          navTitle: 'Услуги',
          slotName: 'tree',
          componentsProps: {}
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
.user-page {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
