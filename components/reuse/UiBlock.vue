<template>
  <div class="ui-block"
       :style="`--vertical-grow: ${verticalGrow};--horizontal-grow: ${horizontalGrow};--total-count: ${total}`"
       :class="classes">
    <div class="deep-wrapper">
      <div ref="title" class="title" v-if="showTitle" :style="`--title-width: ${titleWidth}px`">
        {{ title }}
      </div>
      <ui-tooltip
        v-if="description"
        classes="bottom-left"
        :text="description"
        class="tooltip"
      >
        <fa-icon class="icon question" :class="{open: openHelp}" :icon="['fac', 'question']"/>
      </ui-tooltip>


      <fa-icon
        class="icon expand"
        :class="{open: openHelp}"
        :icon="['fac', isExpanded ? 'collapse' : 'expand']"

        @click="toggleExpand"
      />

      <div class="front-wrapper">
        <slot :name="id"/>
      </div>
    </div>
  </div>
</template>

<script>
  import UiTooltip from "./UiTooltip";

  export default {
    name: "UiBlock",
    components: { UiTooltip },
    props: {
      id: {
        type: String,
        default: '',
      },
      title: {
        type: String,
        default: '',
      },
      description: {
        type: String,
        default: '',
      },
      expandedId: {
        type: String,
        default: '',
      },
      total: {
        type: Number,
        default: 0,
      },
      showTitle: {
        type: Boolean,
        default: true,
      },
      verticalGrow: {
        type: Number,
        default: 1,
      },
      horizontalGrow: {
        type: Number,
        default: 1,
      }
    },
    data() {
      return {
        titleWidth: 0,
        openHelp: false,
      }
    },
    computed: {
      classes() {
        return {
          expanded: this.isExpanded,
          collapsed: this.isCollapsed
        }
      },
      isExpanded() {
        return this.expandedId === this.id
      },
      isCollapsed() {
        return this.expandedId !== this.id && this.expandedId
      }
    },
    methods: {
      toggleExpand() {
        this.$emit('toggleExpand', this.expandedId === this.id ? '' : this.id)
      },
    },
    mounted() {
      this.titleWidth = this.$refs.title.clientWidth
    }
  }
</script>
