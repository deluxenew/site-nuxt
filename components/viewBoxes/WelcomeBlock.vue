<template>
  <div class="welcome-block">
    <h1 class="text-center">
      {{ title }}
    </h1>
    <div class="flex">
      <ui-block
        v-for="block in blocks"
        v-bind="block"
        :key="block.id"
        :total="blocks.length"
        :expandedId="expandedId"
        @toggleExpand="toggleExpand"
      >
        <component
          :is="block.component"
          :slot="block.id"
        />
      </ui-block>
    </div>
  </div>
</template>

<script>
  import { views } from "CONSTANTS/views";

  const {
    content: { components: content },
    ui: { components: ui },
  } = views
  const components = { ...content, ...ui }


  export default {
    name: "WelcomeBlock",
    components,
    props: {
      title: {
        type: String,
        default: 'Строительство домов'
      },
      blocks: {
        type: Array,
        default: () => []
      },
    },
    data() {
      return {
        expandedId: '',
      }
    },
    methods: {
      toggleExpand(v) {
        this.expandedId = v
      }
    }
  }
</script>
