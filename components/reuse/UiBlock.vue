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
  components: {UiTooltip},
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

<style lang="scss" scoped>
$titleWidth: var(--title-width);

$total: var(--total-count);

$vertical: var(--vertical-grow);
$horizontal: var(--horizontal-grow);

.ui-block {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% / #{$horizontal});
  height: calc(100% / #{$vertical});
  background-color: #fff;
  padding: 16px 8px 8px;
  border-radius: 8px;
  overflow: hidden;
  transition: $trs;

  @media (max-width: 800px) {
    width: 100%;
    height: calc(100% / #{$total});

    &.expanded {
      height: calc(100% - ((#{$total} - 1) * 50px));
    }

    &.collapsed {
      height: 50px;
    }
  }

  &.expanded {
    width: 100%;
    height: calc(100% - ((#{$total} - 1) * 50px));
  }

  &.collapsed {
    width: 100%;
    height: 50px;

    .deep-wrapper {
      .front-wrapper {
        transform: scale(0);
      }

      .tooltip {
        opacity: 0;
      }
    }
  }

  .title {
    position: absolute;
    font-weight: bold;
    left: calc(50% - #{$titleWidth / 2});
    padding: 6px 16px 8px;
    top: -12px;
    width: max-content;
    height: 25px;
    font-size: 14px;
    text-align: center;
    border-radius: 8px;
    background-color: $white;
    box-shadow: 0 0 3px rgba($gray, .9), inset 0 0 3px rgba($gray, .9);
    z-index: 3;
  }
  &:hover {
    .deep-wrapper {
      box-shadow: 0 0 3px rgba($green, .9), inset 0 0 3px rgba($green, .9);

      .title {
        box-shadow: 0 0 3px rgba($green, .9), inset 0 0 3px rgba($green, .9);
      }

      .icon {
        box-shadow: 0 0 3px rgba($green, .9), inset 0 0 3px rgba($green, .9);
      }
    }
  }

  &:hover:not(&.collapsed) {
    .deep-wrapper {
      &:before {
        width: calc(100% - 100px);
        height: calc(100% + 40px);
      }

      &:after {
        width: calc(100% + 40px);
        height: calc(100% - 100px);
      }
    }
  }

  .deep-wrapper {
    position: relative;
    border-radius: 8px;
    padding: 16px 4px 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    z-index: 1;
    box-shadow: 0 0 3px rgba($gray, .9), inset 0 0 3px rgba($gray, .9);
    transition: $trs;

    &:before, &:after {
      position: absolute;
      content: '';
      width: 0;
      height: calc(100% + 40px);
      background: linear-gradient(90deg, rgba(63, 94, 251, 0) 0px, rgba(#ffffff, 1) 10px, rgba(#ffffff, 1) calc(100% - 10px), rgba(63, 94, 251, 0) 100%);
      transition: $trs;
      z-index: 2;
    }

    &:after {
      width: calc(100% + 40px);
      height: 0;
      background: linear-gradient(0deg, rgba(63, 94, 251, 0) 0px, rgba(#ffffff, 1) 10px, rgba(#ffffff, 1) calc(100% - 10px), rgba(63, 94, 251, 0) 100%);
    }

    .tooltip {
      position: absolute;
      right: 50px;
      top: -12px;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: $trs;
      opacity: 1;
    }

    .icon {
      position: absolute;
      right: 16px;
      top: -12px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: #fff;
      box-shadow: 0 0 3px rgba($gray, .9), inset 0 0 3px rgba($gray, .9);
      transition: $trs;
      cursor: pointer;
      z-index: 3;
      padding: 4px;

      &.question {
        position: relative;
        top: 0;
        right: 0;
      }

      path {
        transition: $trs;
        fill: $default;

        &:last-child {
          fill: $gray;
        }
      }

      &:hover {
        padding: 3px;
        background-color: $green;

        path {
          fill: $white;

          &:last-child {
            fill: $white;
          }
        }
      }

      &.open {
        path {
          fill: $white;

          &:last-child {
            fill: $green;
          }
        }
      }

      &.expand {

        right: 16px;
        border-radius: 4px;


        path {
          fill: $default;

          &:last-child {
            fill: $gray;
          }
        }

        &:hover {
          padding: 3px;
          background-color: $green;

          path {
            fill: $white;

            &:last-child {
              fill: $white;
            }
          }
        }
      }
    }

    .front-wrapper {
      width: calc(100% - 10px);
      height: calc(100% - 10px);
      padding: 8px;
      z-index: 3;
      overflow: hidden;
      transition: $trs;
    }
  }
}
</style>
