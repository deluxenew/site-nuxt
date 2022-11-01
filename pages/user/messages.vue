<template>
  <single-screen :sections="sections" v-model="currentSectionId">
    <page-sections-navigate
      v-model="currentSectionId"
      slot="nav"
      :items="sections"
    />
    <div class="w-full h-full" v-for="section in sections" :slot="section.slotName" :key="section.slotName">
      <component
        v-for="component in Object.keys(blockComponents[section.slotName][0].componentsProps || {})"
        :key="JSON.stringify(component)"
        :is="component"
        v-bind="section.componentsProps[component]"
      />
    </div>
  </single-screen>
</template>

<script>
  import {views} from "CONSTANTS/views";

  const {content: {components: content}, pageTemplates: {components: templates}, ui: {components: ui}} = views
  const components = {...content, ...templates, ...ui}

  export default {
    name: "messages",
    components,
    middleware: 'isAuth',
    layout: 'personal',
    transition: 'bounce-fast',
    data() {
      return {
        currentSectionId: 0,
        sections: [
          {
            navTitle: 'Сообщения',
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
                    description: "Статистические данные по сообщениям",
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
            navTitle: 'Настройки',
            slotName: 'two',
          },
          {
            navTitle: 'Друзья',
            slotName: 'tree',
            componentsProps: {}
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
