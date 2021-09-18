<template>
  <div class="ui-block" :style="`--vertical-grow: ${verticalGrow};--horizontal-grow: ${horizontalGrow}`">
    <div ref="title" class="title" v-if="showTitle" :style="`--title-width: ${titleWidth}`">
      {{title}}
    </div>
    <div class="deep-wrapper">
      <fa-icon class="icon" :class="{open: openHelp}" :icon="['fac', 'question']" />
      <div class="front-wrapper">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UiBlock",
  props: {
    title: {
      type: String,
      default: '',
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
  mounted() {
    this.titleWidth = this.$refs.title.clientWidth
  }
}
</script>

<style lang="scss" scoped>
$titleWidth: var(--title-width)px;

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

  @media (max-width: 800px) {
    width: 100%;
  }

  .title {
    position: absolute;
    font-weight: bold;
    left: calc(50% - #{$titleWidth / 2});
    padding: 6px 16px 8px;
    top: 3px;
    width: max-content;
    height: 25px;
    font-size: 14px;
    text-align: center;
    border-radius: 8px;
    background-color: $white;
    box-shadow: 0 0 3px rgba($gray, .9), inset 0 0 3px rgba($gray, .9);
    z-index: 3;
    transition: $trs;
  }

  &:hover {
    .title {
      box-shadow: 0 0 3px rgba($green, .9), inset 0 0 3px rgba($green, .9);
    }

    .deep-wrapper {
      box-shadow: 0 0 3px rgba($green, .9), inset 0 0 3px rgba($green, .9);
      .icon {
        box-shadow: 0 0 3px rgba($green, .9), inset 0 0 3px rgba($green, .9);
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
      background: linear-gradient(90deg, rgba(63,94,251,0) 0px, rgba(#ffffff, 1) 10px, rgba(#ffffff,1) calc(100% - 10px), rgba(63,94,251,0) 100%);
      transition: $trs;
      z-index: 2;
    }

    &:after {
      width: calc(100% + 40px);
      height: 0;
      background: linear-gradient(0deg, rgba(63,94,251,0) 0px, rgba(#ffffff, 1) 10px, rgba(#ffffff,1) calc(100% - 10px), rgba(63,94,251,0) 100%);
    }

    &:hover {
      &:before {
        width: calc(100% - 100px);
        height: calc(100% + 40px);
      }
      &:after {
        width: calc(100% + 40px);
        height: calc(100% - 100px);
      }
    }

    .icon {
      position: absolute;
      right: 16px;
      top: -12px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      box-shadow: 0 0 3px rgba($gray, .9), inset 0 0 3px rgba($gray, .9);
      transition: $trs;
      cursor: pointer;

      path {
        transition: $trs;
        fill: $default;
        &:last-child {
          fill: $white;
        }
      }

      &:hover {
        path {
          fill: $white;
          &:last-child {
            fill: $green;
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
    }

    .front-wrapper {
      width: calc(100% - 10px);
      height: calc(100% - 10px);
      padding: 8px;
      z-index: 3;
    }
  }
}
</style>
