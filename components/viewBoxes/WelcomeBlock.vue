<template>
  <div class="welcome-block">
    <h1 class="title">
      {{ title }}
    </h1>
    <div class="flex">
      <ui-block
        v-for="block in blocks"
        v-bind="block"
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
import {views} from "~/constants/views";

const {
  content: {components: content},
  pageTemplates: {components: templates},
  ui: {components: ui},

} = views
const components = {...content, ...templates, ...ui}


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
    }
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

    @media (max-width: 800px) {
     flex-direction: column;
    }
  }

  .title {
    color: $default;
    font-size: $h3;
    text-align: center;
  }
}
</style>
